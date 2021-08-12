import { Client } from 'discord.js';
import { CommandManager } from '../managers/CommandManager';

export class SlasherClient {
  public commands = new CommandManager(this);

  constructor(public discordClient: Client) {}
}