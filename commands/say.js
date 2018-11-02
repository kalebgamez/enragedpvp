const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);

      console.log(`(!) ${message.author.tag} (ID: ${message.author.id}) used command ?say ${sayMessage}, in the channel ${message.channel.id}`); //If breaks, remove ${sayMessage}
}

module.exports.help = {
  name: "say"
}
