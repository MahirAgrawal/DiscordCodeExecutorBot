const compileAPI = require('./services');
require('dotenv/config');
const {Client,GatewayIntentBits, MessageManager,Partials, ALLOWED_EXTENSIONS} = require('discord.js');

String.prototype.isEmpty = function(){
  return (this.length === 0 || !this.trim());
}

//intents are like permission for bot to do stuff on server
const client = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages
],
partials: [
  Partials.Channel
]});

const PREFIX = "/compile";
const DELIMITER = "::::";

client.on('ready', () => {
  console.log(`${client.user.username}`)
});

client.on('messageCreate',async (message)=>{
  if(message.channel.type!=1){
    return;
  }
  if((message.content === 'Hello' || message.content === 'hello') && !message.author.bot){
    message.channel.send(`Hello there, ${message.author}\nSend the code in Format: /compile Code${DELIMITER}Language${DELIMITER}Stdin`);
  }
  if(message.content.startsWith(PREFIX) && !message.author.bot){
    const arr = message.content.substring(PREFIX.length).trim().split(DELIMITER);
    if(arr.length >= 3 && !arr[0].isEmpty() && !arr[1].isEmpty() && !arr[2].isEmpty()){
      message.channel.send('Executing...');
      const res = await compileAPI(arr[0],arr[1],arr[2]);
      message.channel.send('#stderr:\n'+res.stderr+'\n'+'#stdout:\n'+res.stdout);
    }
    else{
      message.channel.send(`Missing parameters 😓`);
    }
  }
});


//logs our bot to the discord api
client.login(process.env.DISCORDJS_BOT_TOKEN);