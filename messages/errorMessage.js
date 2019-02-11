const Discord = require('discord.js');
const errorMessage = message => {
  const embed = new Discord.RichEmbed()
    .setTitle('Player not found')
    .setDescription(message);
  return embed;
};

module.exports = errorMessage;
