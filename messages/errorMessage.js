const Discord = require("discord.js");
const errorMessage = () => {
  const embed = new Discord.RichEmbed()
    .setTitle("Player not found")
    .setDescription(
      "Could not find your PUBG account. Try chaning your nickname to match your PUBG in-game name."
    );
  return embed;
};

module.exports = errorMessage;
