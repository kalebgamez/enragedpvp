const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("You do not have Mute Members Permission!");
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
  if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");

  let role = message.guild.roles.find(r => r.name === "Muted");
  if(!role) {
    try{
       role = await message.guild.createRole({
         name: "Muted",
         color: "#95ff00",
         permissions: []
       });

       message.guild.channels.forEach(async (channel, id) => {
         await channel.overwritePermissions(role, {
           SEND_MESSAGES: false,
           ADD_REACTIONS: false
         });
       });
    } catch(e) {
        console.log(e.stack);
      }
  }

  if(toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already muted!");

  await(toMute.addRole(role));
  message.channel.sendMessage("User has been muted!");

  return;

  console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?mute ${args[0]}, in the channel ${message.channel.id}`); //If breaks, remove ${args[0]}
}

module.exports.help = {
name: "mute"
}
