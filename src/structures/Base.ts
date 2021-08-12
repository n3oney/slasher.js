import { SlasherClient } from '../client/SlasherClient';

export abstract class Base {
  constructor(public client: SlasherClient) {}
}