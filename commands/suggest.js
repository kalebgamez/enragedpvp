const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
//    let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//    if(!sUser) return message.channel.send("Couldn't find user.");
    let suggestion = args.join(" ").slice(0);

    let suggestionEmbed = new Discord.RichEmbed()

    .setThumbnail(`${message.author.avatarURL}`)
    .setTimestamp()
    .setColor("#1cd4dd")
    .addField(`Suggestion From ${message.author.tag}`, suggestion)
    .setFooter("VØƗĐ v0.1.0 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/454833878415441921/477237382039601152/server-icon_2.png");

    let suggestionschannel = message.guild.channels.find(`name`, "suggestions");
    if(!suggestionschannel) return  message.channel.send("Couldn't find a channel named suggestions!");


    message.delete().catch(O_o=>{});
    suggestionschannel.send(suggestionEmbed);

    console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command -suggestion ${args[0]}`);
}

module.exports.help = {
  name: "suggest"
}
