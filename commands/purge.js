const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
  if(!args[0]) return message.channel.send("no");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2000));
});

  console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?clear ${args[0]}, in the channel ${message.channel.id}`); //if breaks, remove ${args[0]}
}

module.exports.help = {
  name: "purge"
}
