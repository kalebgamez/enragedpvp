const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't find user.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#ff6500")
    .setTimestamp()
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Reason", bReason)
    .setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");

    let banchannel = message.guild.channels.find(`name`, "logs");
    if(!banchannel) return  message.channel.send("Couldn't find a channel named logs!");

    message.guild.member(bUser).ban(bReason);
    banchannel.send(banEmbed);

    console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?ban, in the channel ${message.channel.id}`);
}

module.exports.help = {
  name: "ban"
}
