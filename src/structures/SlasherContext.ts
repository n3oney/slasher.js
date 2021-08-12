import { CommandInteraction } from 'discord.js';
import { SlasherClient } from '../client/SlasherClient';
import { Props } from '../util/SlasherPropTypes';
import { Base } from './Base';
import { SlasherCommand } from './SlasherCommand';
import { SlasherError } from './SlasherError';

export class SlasherContext<T extends Props> extends Base {
  public get props(): T {
    const props: Props = {};

    for (const option of this.slasherCommand.options) {
      switch (option.type) {
        case 'BOOLEAN':
          props[option.name] = this.interaction.options.getBoolean(option.name);
          break;
        case 'CHANNEL':
          props[option.name] = this.interaction.options.getChannel(option.name);
          break;
        case 'INTEGER':
          props[option.name] = this.interaction.options.getInteger(option.name);
          break;
        case 'MENTIONABLE':
          props[option.name] = this.interaction.options.getMentionable(option.name);
          break;
        case 'NUMBER':
          props[option.name] = this.interaction.options.getNumber(option.name);
          break;
        case 'ROLE':
          props[option.name] = this.interaction.options.getRole(option.name);
          break;
        case 'STRING':
          props[option.name] = this.interaction.options.getString(option.name);
          break;
        case 'USER':
          props[option.name] = this.interaction.options.getUser(option.name);
          break;
        default:
          throw new SlasherError(`The ${option.type} option type is currently unsupported.`);
      }
    }

    return props as T;
  }

  public constructor(client: SlasherClient, public interaction: CommandInteraction, public slasherCommand: SlasherCommand<T>) {
    super(client);
  }
}