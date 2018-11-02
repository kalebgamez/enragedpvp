const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
//const botconfig = require("./botconfig.json");
const TOKEN = ("NTA4MDA0ODQzOTY1OTA2OTU1.Dr477g.NKpb2dYg6W84Uz3da9Ib9AYpTxI");     //attempt to replace const botconfig = require("./botconfig.json");
const PREFIX = ("?");                                                              //attempt to replace const botconfig = require("./botconfig.json");
bot.commands = new Discord.Collection();

let cooldown = new Set();                                                          //I have no idea what this is going to
let cdseconds = 5;                                                                 //I have no idea what this is going to

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`Loaded: ./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => {
  console.log(`========================================================`);
  console.log(`${bot.user.username} is online.`);
  console.log(`${bot.user.username} is in ${bot.guilds.size} servers!`);
  console.log(`${bot.user.username} is interacting with ${bot.users.size} users!`);
  console.log(`========================================================`);
  bot.user.setActivity("HyperiumMC.us", {type: "PLAYING"});

});

//start of events
//bot.on("guildMemberAdd", async member => {
//  console.log(`${member.id} joined the server!`);

//  let joinEmbed = new Discord.RichEmbed()
//  .setAuthor(`Welcome!`)
//  .setColor("#07e90a")
//  .setTimestamp()
//  .addField("Username", `${member}`)
//  .addField("IP", `HyperiumMC.us`)
//  .addField("Store:", `http://store.hyperiummc.us/`)
//  .addField("Discord:", `https://discord.gg/gGFJZs5`)
//  .addField("Website:", `ERROR_WEBSITE_IS_UNLINKED`)
//  .setFooter("Hyperium v2.0.1 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/485532983953063957/485826504060829696/hypherionmc.png")

//  let joinchannel = member.guild.channels.find(`name`, "welcome");
//  if(!joinchannel) return  message.channel.send("Couldn't find a channel named portal!");
//  joinchannel.send(joinEmbed);

//  let logjoinEmbed = new Discord.RichEmbed()
//  .setAuthor(`A user has joined the discord`)
//  .setColor("#07e90a")
//  .setTimestamp()
//  .addField("Username", `${member}`)
//  .setFooter("Hyperium v2.0.1 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/485532983953063957/485826504060829696/hypherionmc.png")

//  let logjoinchannel = member.guild.channels.find(`name`, "logs");
//  if(!logjoinchannel) return  message.channel.send("Couldn't find a channel named logs!");
//  logjoinchannel.send(logjoinEmbed);
//});

//bot.on("guildMemberRemove", async member => {
//  console.log(`${member.id} left the discord!`);

//  let leaveEmbed = new Discord.RichEmbed()
//  .setAuthor("~Leave~")
//  .setColor("#ff0000")
//  .setTimestamp()
//  .setDescription("A user has left the Kingdom!")
//  .addField("Username:", `${member}`)
//  .setFooter("Hyperium v2.0.1 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/485532983953063957/485826504060829696/hypherionmc.png")
//
//  let leavechannel = member.guild.channels.find(`name`, "welcome");
//  if(!leavechannel) return  message.channel.send("Couldn't find a channel named portal!");
//  leavechannel.send(leaveEmbed);

//  let logleaveEmbed = new Discord.RichEmbed()
//  .setAuthor("A user has left the discord")
//  .setColor("#ff0000")
//  .addField("Username", `${member}`)
//  .setFooter("Hyperium v2.0.1 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/485532983953063957/485826504060829696/hypherionmc.png")
//
//  let logleavechannel = member.guild.channels.find(`name`, "logs");
//  if(!logleavechannel) return  message.channel.send("Couldn't find a channel named logs!");
//  logleavechannel.send(logleaveEmbed);
//});
//end of events

bot.on("message", async message => {
  if (!message.content.startsWith(PREFIX)) return;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = ("?");
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

//Start of Coins

let coins = require("./coins.json");

if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let coinAmt = Math.floor(Math.random() *50 +1);
let baseAmt = Math.floor(Math.random() *50 +1);
console.log(`${message.author.tag} (ID: ${message.author.id}) chance at earning coins: ${coinAmt} ; ${baseAmt}`);

if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});
let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#e0c90b")
.addField("💸", `${coinAmt} coins added!`)
.setFooter("Kingdoms v1.23.8 | By Kaleb#2157", "https://cdn.discordapp.com/attachments/461131969246396426/463004456661811202/discord_k.png");

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}
//End of Coins



//Start of XP

let xp = require("./xp.json");

let xpAdd = Math.floor(Math.random() *7) + 8;
console.log(`${message.author.tag} (ID: ${message.author.id}) gained ${xpAdd} xp!`);

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;

}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});
//End of XP

});

try {
    bot.login(TOKEN);
} catch(err) {
    console.log(err);
}
//bot.login(botconfig.token);
