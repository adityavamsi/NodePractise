const { REST, Routes } = require('discord.js');

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];
  
  const rest = new REST({ version: '10' }).setToken("MTIxODgyODc5MzcyOTI1NzUzMg.GYg1q6.uGeUqo1lP-Me0ECx6xKrqU3nIUq2D433EFwd7o");
  

  (async()=>{

    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands('1218828793729257532'), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }

  })();
  
