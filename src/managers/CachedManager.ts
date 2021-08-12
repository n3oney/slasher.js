import { LimitedCollection } from 'discord.js';
import { SlasherClient } from '../client/SlasherClient';
import { Base } from '../structures/Base';
import { SlasherError } from '../structures/SlasherError';

export abstract class CachedManager<K, V> extends Base {
  constructor(client: SlasherClient, maxSize = 200) {
    super(client);
    this._cache = new LimitedCollection<K, V>({
      maxSize
    });
  }

  private _cache: LimitedCollection<K, V>;

  get cache(): LimitedCollection<K, V> {
    return this._cache;
  }

  protected _add(data: V | { id: K } & V, id?: K): V {
    if (!('id' in data) && !id) throw new SlasherError('Missing ID.');
    this._cache.set('id' in data ? data.id : id!, data);

    return data;
  }
}