const Discord = require('discord.js');
const mongoose = require('mongoose');
const fetchUserId = require('./api/accountId');
const fetchSeasonStats = require('./api/seasonStats');
const User = require('./models/user');
const statsMessage = require('./messages/statsMessage');
const errorMessage = require('./messages/errorMessage');

//Secrets
require('./keys');

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
    try {
      const id = await fetchUserId(name);
      const stats = await fetchSeasonStats(id);

      // creates message to send to the channel
      const embed = statsMessage(name, stats);
      // sends message to the channel
      statsChannel.send({ embed });
    } catch (err) {
      const embed = errorMessage();
      statsChannel.send({ embed });
    }
  }
});

client.login(process.env.TOKEN);
