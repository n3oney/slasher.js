import { ApplicationCommand, Interaction, MessageEmbed, Snowflake } from 'discord.js';
import { SlasherClient } from '../client/SlasherClient';
import { SlasherCommand } from '../structures/SlasherCommand';
import { SlasherContext } from '../structures/SlasherContext';
import { CachedManager } from './CachedManager';

export class CommandManager extends CachedManager<string, SlasherCommand<never>> {
  public async registerCommands(commands: { new(client: SlasherClient): SlasherCommand<never> }[]): Promise<CommandManager> {
    for (const Command of commands) {
      const instance = new Command(this.client);

      await this.createCommand(instance);
      this._add(instance, instance.name.toLowerCase());
    }

    return this;
  }

  public async createCommand(command: SlasherCommand<never>): Promise<CommandManager> {
    let cmd: ApplicationCommand | undefined;

    if (command.guildId)
      cmd = await this.client.discordClient.application?.commands.create({
        name: command.name,
        description: command.description,
        options: command.options,
        defaultPermission: command.defaultPermission
      }, command.guildId);
    else
      cmd = await command.client.discordClient.application?.commands.create({
        name: command.name,
        description: command.description,
        options: command.options,
        defaultPermission: command.defaultPermission
      });

    if (cmd) {
      if (command.guildId)
        await cmd.permissions.set({
          permissions: command.permissions
        });

      command.id = cmd.id;
    }

    return this;
  }

  private async _handleInteraction(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const command = this.cache.get(interaction.commandName.toLowerCase());
    if (!command) return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('This command wasn\'t found! It most likely has been removed.')
      ],
      ephemeral: true
    });
    const context = new SlasherContext(this.client, interaction, command);

    await command.run(context);
  }

  constructor(client: SlasherClient, maxSize = 200) {
    super(client, maxSize);

    client.discordClient.on('interactionCreate', this._handleInteraction.bind(this));
  }
}