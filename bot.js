const Discord = require('discord.js');
const fetchUserId = require('./api/accountId');
const fetchSeasonStats = require('./api/seasonStats');
const statsMessage = require('./messages/statsMessage');
const errorMessage = require('./messages/errorMessage');

// //Secrets
// require('./keys');

// bot init
const client = new Discord.Client();
client.on('ready', () => {
  console.log('Bot Ready!');
});

// message handleing
const prefix = '!';
client.on('message', async msg => {
  //turns message into an array of words

  const args = msg.content.split(' ');
  const mode = args[1];

  // statsbot channel
  const statsChannel = msg.guild.channels.find('name', 'statsbot');
  const name = msg.member.nickname || msg.author.username;

  if (!args[0].startsWith(prefix)) return null;

  if (args[0].startsWith(prefix + 'test')) {
    client.emit('guildMemberAdd', msg.author);
  }

  if (args[0].startsWith(prefix + 'ping')) {
    msg.channel.send('Hello ' + name);
  }

  if (args[0].startsWith(prefix + 'stats')) {
    const modes = ['solo', 'duo', 'squad', 'solo-fpp', 'duo-fpp', 'squad-fpp'];
    console.log(mode);
    try {
      try {
        if (!mode || !modes.includes(mode.toLowerCase())) {
          throw new Error(
            "Please specify mode: 'solo', 'duo', 'squad', 'solo-fpp', 'duo-fpp', 'squad-fpp'"
          );
        }
      } catch (error) {
        //throwing error for no mode included in bot command
        throw error;
      }
      try {
        const id = await fetchUserId(name);
        const stats = await fetchSeasonStats(id, mode);
        statsChannel.send(statsMessage(name, stats));
      } catch (error) {
        throw new Error(
          'Could not find your PUBG account. Try chaning your nickname to match your PUBG in-game name.'
        );
      }
    } catch (error) {
      statsChannel.send(errorMessage(error.message));
    }
  }
});

client.login(process.env.TOKEN);
