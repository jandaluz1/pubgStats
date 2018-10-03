const Discord = require('discord.js');
const mongoose = require('mongoose');
const Memcached = require('memcached');
const { token } = require('./config.json');
const fetchUserId = require('./api/accountId');
const fetchSeasonStats = require('./api/seasonStats');
const User = require('./models/user');

//db connection
mongoose.connect(
  'mongodb://localhost/statsbot',
  { useNewUrlParser: true }
);

// check for connection erros
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!');
});

//cache

// bot init
const client = new Discord.Client();
client.on('ready', () => {
  console.log('Bot Ready!');
});

// message on server join
client.on('guildMemberAdd', member => {
  // const user = User.findOne({ id: member.id })[0];
  // if (!user) {
  //   member.send('What is your pubg name?');
  // }
});

// message handleing
const prefix = '!';
client.on('message', async msg => {
  //turns message into an array of words

  const args = msg.content.split(' ');
  // statsbot channel
  const statsChannel = msg.guild.channels.find('name', 'statsbot');
  //handles messages for setting name

  if (msg.channel.type === 'dm') {
    //filtering out the message from the bot

    if (!msg.author.bot) {
      const name = args[0];
      User.findOne({ pubgName: name }, function(err, obj) {
        if (err) throw err;
        if (!obj) {
          User.create({
            discordId: msg.author.id,
            discordUsername: msg.author.username,
            pubgName: name
          });
        }
      });
    }
  }
  if (!args[0].startsWith(prefix)) return null;

  if (args[0].startsWith(prefix + 'test')) {
    client.emit('guildMemberAdd', msg.author);
  }

  if (args[0].startsWith(prefix + 'ping')) {
    msg.channel.send('Hello ' + (msg.member.nickname || msg.author.username));
  }

  if (args[0].startsWith(prefix + 'stats')) {
    User.findOne({ discordId: msg.author.id }, async function(err, doc) {
      if (err) throw err;
      if (!doc.pubgAccountId) {
        const id = await fetchUserId(doc.pubgName);
        doc.pubgAccountId = id;
        await doc.save(function(err, doc) {
          if (err) throw err;
        });
      }
      // console.log(doc);
      //caching stats
      //set stats to data found in cache
      let stats = null;
      //if not found in cache call API to get stats and store in cache for 10 min
      if (!stats) {
        stats = await fetchSeasonStats(doc.pubgAccountId);
      }
      console.log('STATS', stats);
      // creates message to send to the channel
      const embed = new Discord.RichEmbed()
        .setTitle(doc.pubgName)
        .setColor('#6890cc')
        .addField('K/D', stats['k/d'], true)
        .addField('Wins', stats.wins, true)
        .addField('Top10s', stats.top10s, true)
        .addField('Games', stats.wins + stats.losses);
      statsChannel.send({ embed });
    });
  }
});

client.login(token);
