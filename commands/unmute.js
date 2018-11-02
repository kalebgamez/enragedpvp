const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.senbMessage("You do not have Permission!");
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
  if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");

  let role = message.guild.roles.find(r => r.name === "Muted");

  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

  awaittoMute.removeRole(role);
  message.channel.sendMessage("User has been unmuted!");

  return;

  console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?unmute ${args[0]}, in the channel ${message.channel.id}`); //If breaks, remove ${args[0]}
}

module.exports.help = {
name: "unmute"
}
