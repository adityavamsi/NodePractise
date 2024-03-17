const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds , GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate',message=>{
    if(message.author.bot) return;
    message.reply({
        content:"Hiii From Bot",
    })
});

client.on('interactionCreate',(interaction)=>{
    console.log(interaction);
    interaction.reply("Pong!!")
})

client.login("MTIxODgyODc5MzcyOTI1NzUzMg.GYg1q6.uGeUqo1lP-Me0ECx6xKrqU3nIUq2D433EFwd7o")