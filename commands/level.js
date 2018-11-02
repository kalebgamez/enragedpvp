const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#fc6f00")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .addField(`${difference} XP till level up!`, message.author.displayAvatarURL)
  .setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");
//  .setFooter(`${difference} XP till level up!`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

  console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?level, in the channel ${message.channel.id}`);
}

module.exports.help = {
  name: "level"
}
