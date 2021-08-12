import { ApplicationCommandOptionData, ApplicationCommandPermissions, Snowflake } from 'discord.js';
import { SlasherClient } from '../client/SlasherClient';
import { Props } from '../util/SlasherPropTypes';
import { Base } from './Base';
import { SlasherContext } from './SlasherContext';

export interface SlasherCommandData {
  name: string;
  description: string;
  options: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
  permissions?: ApplicationCommandPermissions[];
  guildId?: Snowflake;
}

export abstract class SlasherCommand<T extends Props> extends Base {
  public name: string;
  public description: string;
  public options: ApplicationCommandOptionData[];
  public defaultPermission: boolean;
  public permissions: ApplicationCommandPermissions[];
  public guildId?: Snowflake;

  public id?: string;

  abstract run(context: SlasherContext<T>): Promise<unknown>;

  constructor(client: SlasherClient, data: SlasherCommandData) {
    super(client);
    this.name = data.name;
    this.description = data.description;
    this.options = data.options;
    this.defaultPermission = data.defaultPermission ?? true;
    this.permissions = data.permissions ?? [];
    this.guildId = data.guildId;
  }
}