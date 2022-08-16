const
{
    Client, Message, MessageEmbed, GuildMemberManager
} = require('discord.js');
const messageCreate = require('./messageCreate');


module.exports = 
{
    name:"kick",
    /*
    *@param {Client} client
    *@param {Message} message
    *@param {String[]} args
    */

    run: async(client,message,args,Discord) =>
    {
        const user = message.mentions.member.first();

        if(user)
        {

                await user.kick().then(() =>{message.channel.send('Expulsé')});
        
            
        }
        else
        {
            member.channel.send('Utilisateur introuvable');
        }

    }
}