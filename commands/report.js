const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("~Report~")
    .setColor("#1cd4dd")
    .setTimestamp()
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Reason", reason)
    .setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return  message.channel.send("Couldn't find a channel named logs!");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?report ${reason}, in the channel ${message.channel.id}`); //If breaks, remove {reason}
}

module.exports.help = {
  name: "report"
}
