const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#fc6f00")
  .addField("💰", uCoins)
  .setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});

  console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?coins, in the channel ${message.channel.id}`);
}

module.exports.help = {
  name: "coins"
}
