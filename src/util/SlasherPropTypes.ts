import { GuildChannel, GuildMember, Role, User } from 'discord.js';
import { APIInteractionDataResolvedChannel, APIInteractionDataResolvedGuildMember, APIRole } from 'discord-api-types';

export type BooleanOption = boolean;
export type ChannelOption = GuildChannel | APIInteractionDataResolvedChannel;
export type IntegerOption = number;
export type MemberOption = GuildMember | APIInteractionDataResolvedGuildMember;
export type RoleOption = Role | APIRole;
export type UserOption = User;
export type MentionableOption = UserOption | MemberOption | RoleOption;
export type NumberOption = number;
export type StringOption = string;

export type PropType = BooleanOption | ChannelOption | IntegerOption | MemberOption | RoleOption | UserOption | MentionableOption | NumberOption | StringOption;
export type Props = Record<string, PropType | null>;