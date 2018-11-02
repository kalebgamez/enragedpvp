const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find user.");//Make an embed that says: "Incorrect usage! Here is how the command is used: ?kick @user"
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be kicked!");
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#ff00f1")
    .setTimestamp()
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Reason", kReason)
    .setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");
    let kickchannel = message.guild.channels.find(`name`, "logs");
    if(!kickchannel) return  message.channel.send("Couldn't find a channel namd logs!");
    message.guild.member(kUser).kick(kReason);
    kickchannel.send(kickEmbed);
    console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?kick, in the channel ${message.channel.id}`);
}
module.exports.help = {
  name: "kick"
}
