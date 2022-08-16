const
{
    Client, Message, MessageEmbed, GuildMemberManager
} = require('discord.js');
const messageCreate = require('./messageCreate');


module.exports = 
{
    name:"ban",
    /*
    *@param {Client} client
    *@param {Message} message
    *@param {String[]} args
    */

    run: async(client,message,args,Discord) =>
    {
        const user = message.mentions.member.first();
        const reason = args.slice(0).join(' ');
        if(!reason) return message.channel.send('Il faut une raison pour executer cette commande');

        if(user)
        {

                await user.ban
                ({
                    reason: reason,
                }).then(() =>{message.channel.send('Banni')});
                        
        }
        else
        {
            member.channel.send('Utilisateur introuvable');
        }

    }
}