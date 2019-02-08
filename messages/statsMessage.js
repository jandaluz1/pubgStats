const Discord = require('discord.js');
const statsMessage = (name, stats) => {
  const embed = new Discord.RichEmbed()
    .setTitle(name)
    .setColor('#6890cc')
    .addField('RankPoints', stats.rankPoints)
    .addField('K/D', stats['k/d'], true)
    .addField('Wins', stats.wins, true)
    .addField('Top10s', stats.top10s, true)
    .addField('Games', stats.wins + stats.losses);
  return embed;
};

module.exports = statsMessage;
