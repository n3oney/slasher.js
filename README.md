# slasher.js - a slash command framework for Discord.js
<div align="center">
  <a href="https://www.npmjs.com/package/slasher.js"><img src="https://img.shields.io/npm/v/slasher.js?maxAge=3600" alt="NPM version" /></a>
  <a href="https://www.npmjs.com/package/slasher.js"><img src="https://img.shields.io/npm/dt/slasher.js"
  alt="NPM downloads" /></a>
</div>

#### Note: This framework is not yet stable, although it does have enough functionality to let you create a Discord bot that uses slash commands.

## Why?
I've wanted to re-write my bots to use slash commands and haven't been able to find a good framework to simplify the repetitive work. In the past, I've really liked [slash-create](https://github.com/Snazzah/slash-create), but I've found it hard to integrate with Discord.js and to leverage the type-safety of TypeScript.

## Example bot
```ts
// index.ts
import { Client, Intents } from 'discord.js';
import { SlasherClient } from 'slasher.js';
import { PingCommand } from './commands/Ping.command';

const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES
  ],
});

const slasher = new SlasherClient(client);

client.on('ready', async () => {
  await slasher.commands.registerCommands([
    PingCommand
  ]);
});

client.login(process.env.TOKEN);
```

```ts
// commands/Ping.command.ts
import { BooleanOption, SlasherCommand, SlasherContext, ChannelOption, SlasherClient } from 'slasher.js';

type PingProps = {
  pong?: BooleanOption,
}

export class PingCommand extends SlasherCommand<PingProps> {
  async run(context: SlasherContext<PingProps>) {
    context.interaction.reply({
      content: context.props.pong ? 'Pong!' : 'Yeah, I\'m working fine.'
    });
  }

  constructor(client: SlasherClient) {
    super(client, {
      name: 'ping',
      description: 'It responds for you!',
      options: [{
        type: 'BOOLEAN',
        name: 'pong',
        description: 'Whether it should pong or just... respond.',
        required: false
      }],
      guildId: '12345678'
    });
  }
}
```

## Future plans
- [ ] change the constructor override to a decorator, because it would look nicer and be less scary
- [ ] add support for subcommands