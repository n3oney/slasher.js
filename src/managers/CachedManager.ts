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

  protected _add(value: V, key: K): V {
    if (!('id' in value) && !key) throw new SlasherError('Missing ID.');
    this._cache.set(key, value);

    return value;
  }
}