const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  let helpembed = new Discord.RichEmbed()
  .setTitle("~Help~")
  .setColor("#f5ab15")
  .setDescription("Here is an updated list of all my commands!")
//  .addField("Here is a list of all my commands and what they do!")
  .addField("[#portal]", "Custom Join and Leave messages")
  .addField("?ban [@User#1234] [REASON]", "Ban a player w/ a reason")
  .addField("?coins", "Check how many coins you have")
  .addField("?kick [@User#1234]", "Kick a player")
  .addField("?level", "Check your chat level")
  .addField("?mute [@User#1234]", "Mute a player")
  .addField("?purge [#]", "Delete mass messages")
  .addField("?report [@User#1234] [REASON]", "Report another user if you think they have broken the rules")
  .addField("?unmute [@User#1234]", "Unmute a player")
  .setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");

  message.channel.send(helpembed);

  console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?help, in the channel ${message.channel.id}`);
}

module.exports.help = {
  name: "help"
}
