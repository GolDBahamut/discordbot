const fs = require ("fs");

const Discord = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = require('discord.js/src/client/Client');
const Canvas = require("canvas");
require("dotenv").config();

const client = new Discord.Client(
    {
        intents : 
        [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_MEMBERS

            //Discord.Intents.FLAGS.DIRECT_MESSAGES
        ]
    
    });

const ownerID = "382666729324544000";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Permettra d'afficher le ping du bot (pas encore prêt)")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Mentionner un utilisateur")
        .setRequired(false))
    ;
const clearCommand = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Permet de supprimer des messages")
    .addIntegerOption(option =>
        option.setName("number")
        .setDescription("Nombre de Message a supprimer")
        .setRequired(true)
    );

const stop = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Permet d'arreter le bot");

const leon = new SlashCommandBuilder()
    .setName("leon")
    .setDescription("Permet de react un leon qui baille");



const prefix = "b.";
var nbTickets = 0 ;

process.on('unhandledRejection', function(e) {
    console.error(e);
  });

//Event ready
client.on("ready", async() => {

    var ServAccess = client.guilds.cache.get("764244233972351057")
    //Client.application.commands.create(data); affichera la commandes sur tout les serveurs ayant le bot (methode lente mais complete)
    ServAccess.commands.create(data);

    //recharger le cache du bot
    console.log( ServAccess.commands.cache);
    await ServAccess.commands.fetch();
    console.log( ServAccess.commands.cache);
    
    
    ServAccess.commands.create(stop);

    //permet de supprimer toutes les commandes du bot 
    /*ServAccess.commands.cache.map(command => 
        {
            command.delete;
        })

        console.log( ServAccess.commands.cache);*/


    // permet de supprimer une commandes du bot
   //client.application.commands.guilds.cache.get("1005616708150640770").delete();

    //permet de supprimer des commandes du bot de Discord
    /*client.application.commands.cache.map(command => 
        {
            command.delete;
        })*/

    client.application.commands.create(clearCommand);


/*
    var row = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId("open-ticket")
            .setLabel("ouvrir un ticket")
            .setStyle("PRIMARY")        
        );

    client.channels.cache.get("1004709080444719105").send(
        {
            content : "Appuyez sur le bouton pour ouvrir un ticket", components: [row]
        });*/


    console.log("bot opérationnel");
});


//arreter le bot
client.on("interactionCreate", async interaction => 
{    
    if(interaction.isCommand())
    {
        if(interaction.member.permissions.has("ADMINISTRATOR"))
        {
        if(interaction.commandName === "stop")
        {
            if(interaction.user.id === ownerID)
            {
                client.destroy();
            }
            else
            {
                interaction.reply({content : "Vous n'avez pas les droit pour executer cette commande", ephemeral:true});
            }
        }
        }
    }

    //gestion de tickets

    if(interaction.isButton())
    {
        if(interaction.customId === "open-ticket")
        {
            nbTickets ++;

            interaction.guild.channels.create("ticket-" + nbTickets , 
            {
                parent : "1004708918678786128"
            }).then(channel =>
                {
                    var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("close-ticket")
                        .setLabel("fermer un ticket")
                        .setStyle("DANGER")        
                    );
                

                    channel.send
                    ({
                        content: "<@"+interaction.user.id+"> Voici votre ticket , vous pouvez le fermer en appuyant sur le bouton ci-dessous" , components : [row]
                    })
                })
        /*interaction.reply(
            {
                content: "Ticket créé avec succès" , ephemeral : true
            });*/
        }
        else if(interaction.customId === "close-ticket")
        {
            interaction.channel.setParent("1004709246866313226")

            var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("delete-ticket")
                .setLabel("supprimer un ticket")
                .setStyle("DANGER")        
            );

            interaction.message.delete();

            interaction.channel.send(
                {
                    content : "Supprimer le ticket", components: [row]
                });
            
            /*interaction.reply(
                {
                    content: "Ticket archivé avec succès" , ephemeral : true
                });       */ 
        }

        else if(interaction.customId === "delete-ticket")
        {
            interaction.channel.delete();

            /*interaction.reply(
                {
                    content : "Ticket supprimé avec succès", ephemeral: true
                }); */       
        }
    }

    //Gere les slash commandes

    if(interaction.isCommand())
    {
        if(interaction.commandName === "ping")
        {
            let user = interaction.options.getUser("utilisateur");

            if(user == undefined)
            {
                interaction.reply("Ping reçu");
            }
            else
            {
                //va ping l'utilisateur par reecriture
                interaction.reply("<@" + user.id +"> Vous avez été ping")
            }
        }
        if(interaction.member.permissions.has("ADMINISTRATOR"))
        {
            if(interaction.commandName === "clear")
            {
                var number = interaction.options.getInteger("number")

                if(number >=1 && number <= 100)
                {
                interaction.channel.bulkDelete(number);
                interaction.reply(
                    {
                        content: number + " messages correctement supprimés" , ephemeral:true
                    }
                )}
                else
                {
                    interaction.reply(
                        {
                            content:"Le nombre de messages à supprimés doit etre compris entre 1 et 100" , ephemeral:true
                        }
                    )
                }
            }
        }
        
        if(interaction.commandName === "leon")
        {
            const message = await interaction.reply(
            { 
                content: 'You can react with custom emojis!', fetchReply: true 
            });
            message.react('<:leon:1005520037332914177>');
        }
        
    }

    //Bouton
    if(interaction.isButton())
    {
        if(interaction.customId = "bouton1")
        {//la reaction au bouton commence ici
            interaction.reply("Vous avez appuyez sur le bouton avec succes")
        }
    }
    //Menu

    if(interaction.isSelectMenu())
    {
        if(interaction.customId === "select")
        {
            console.log(interaction.values);

            if(interaction.values == "option1")
            {
                interaction.reply
                ({
                    content: "Vous avez ajouter le role" , ephemeral:true
                })
                interaction.member.roles.add("1004072125541400716")

            }
            if(interaction.values[0] == "option2")
            {
                interaction.reply
                ({
                    content: "Vous avez retirer le role" , ephemeral:true
                })

                interaction.member.roles.remove("1004072125541400716")


            }
        }
    }

})
client.login(process.env.BOT_TOKEN);

client.on("messageCreate",async message => 
{
    var hello = ["hello","salut","bonjour","bienvenue"];
    var nuit = ["bonsoir le bot"];
    var modo = ["peut etre modo","peut être modo","peut etre moderateur","peut être moderateur","peut etre modérateur","peut être modérateur"];
    var news = ["ca va le bot","quoi de neuf le bot","ça va le bot"];
    var testing = ["test"];
    var GN = ["bonne nuit"];
    var nomnom = ["miam miam","nom nom","trop bon"];
    var kaguyasan = ["comme c'est mignon","o kawai koto"];


    if (message.author.bot)return;//permet de detecter que l'auteur du message 

    if (hello.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.channel.send("Hello !"); //permet de repondre a un message sans quil soit afficher comme une reponse

    }
    if (nuit.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.channel.send("Bonsoir !"); //permet de repondre a un message sans quil soit afficher comme une reponse

    }
    if (GN.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.channel.send("Bonne nuit a toi aussi !"); //permet de repondre a un message sans quil soit afficher comme une reponse

    }

    if (testing.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.react('<:soraJudge:907721258827939890>');
    }

    if (kaguyasan.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.react('<:kaguya:1007056590551138474>');
    }


    if (nomnom.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.react('<:yumemiko:1007010900030541866>');
    }

    if (news.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.reply("Je vais bien et toi ? \n(Juste pour dire mon créateur est toujours fatigué )"); //permet de repondre a un message sans quil soit afficher comme une reponse

    }

    if (modo.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.reply("Tu n'as pas à demander cela !"); //permet de repondre a un message sans quil soit afficher comme une reponse

    }
    //message.content != prefix + "help" message.reply("Message reçu !");//permet au bot d'envoyer un message en tant que reponse
    
    if (message.content === prefix + "ping" )
    {
        message.reply("Ping reçu")
    }

    if (message.content === prefix + "masterClass" )
    {
        message.reply("https://www.youtube.com/watch?v=p2wIPUQu4JQ")
    }

    if(message.channel.type == "DM")return;

    if(message.member.permissions.has("ADMINISTRATOR"))
    {
        if(message.content.startsWith(prefix + "ban"))
        {
            let mention = message.mentions.members.first();
            if(mention == undefined)
            {
                message.reply("Le membre à été non ou mal-mentionné");
            }
            else
            {
                if(mention.bannable)
                {
                    mention.ban();
                    message.channel.send(mention.displayName + " à été banni")
                }
                else
                {
                    message.reply("Impossible de bannir ce membre")
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick"))
        {
            let mention = message.mentions.members.first();
            if(mention == undefined)
            {
                message.reply("Le membre à été non ou mal-mentionné");
            }
            else
            {
                if(mention.kickable)
                {
                    mention.kick();
                    message.channel.send(mention.displayName + " à été expulsé")
                }
                else
                {
                    message.reply("Impossible d'expulsé ce membre")
                }
            }
        }
        


    }


    if(message.content === prefix + "help" || message.content == "I need your help Bahamut !")
    {
    const embed = new Discord.MessageEmbed()
        .setColor("#d60000")
        .setTitle("Liste des commandes")
        .setURL("https://discord.js.org/")
        .setAuthor("Auteur du bot","https://i.imgur.com/AfFp7pu.png","https://discord.js.org/")
        .setDescription("*Contient la listes des commandes*")
        //.setThumbnail("https://i.imgur.com/AfFp7pu.png")
        .addField("hello","Le bot repondra Hello en retour")
        .addField("b.Ping","Permettra d'afficher le ping du bot (pas encore prêt)")
        .addField("b.help","Affiche la liste des commandes")
        .addField("b.Menu","Permet d'afficher le Menu de selection de Role")
        .addField("b.bouton","Permet d'afficher un message a bouton (pas de reaction particulier) *IN PROGRESS*")
        .addField("b.ban","Permet de bannir un membre")
        .addField("b.kick","Permet d'expulser un membre")

        .addField("/clear + nombre","permet de clear un nombre defini de message dans un channel")        
        .addField("/stop","permet d'arreter le bot")        

        //.setImage("https://i.imgur.com/AfFp7pu.png")
        .setTimestamp()
        .setFooter("Finishim.G.D.B is the owner of this bot")
        ;

        message.channel.send({ embeds :[embed]});
    }
    if(message.content === prefix + "bouton")
    {
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("bouton1")
                .setLabel("Appuyez")
                .setStyle("DANGER")
                .setEmoji("😉")
            ).addComponents(new Discord.MessageButton()
                .setLabel("doc discord.js")
                .setStyle("LINK")
                .setEmoji("💻")
                .setURL("https://discord.js.org/")
            
            );
        
        message.channel.send(
            {
                content:"message avec bouton", components:[row]
            });
    }        
    if(message.content === prefix + "Menu")
    {
    var row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Selectionnez une option")
                .addOptions
                ([
                    {
                        label: "Ajouter role",
                        description: "1ere description",
                        value: "option1"
                    },
                    {
                        label: "Retirer role",
                        description: "2nd description",
                        value: "option2"
                    }
                ])
        );

        message.channel.send(
            {
                content:"Menu de selection de Role", components:[row]
            });

    }
    
    const ratio = ["ratio"]
    const leon = ["leon"]
    const liens = ["http://","https://","www."]

    if (leon.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.react('<:leon:1005520037332914177>');

    }

    /*if(message.member.permissions.has("ADMINISTRATOR"))
    {}
    else*/
    if (liens.some(word => message.toString().toLowerCase().includes(word))) 
    {
        message.delete().catch(e => 
            console.error("Couldn't delete message.")); 
            message.reply(`Vous n'avez pas le niveau nécessaire pour effectuer ceci \n You do not have the required level to do this`)
    };
    
    if (message.content == "ratio" || message.content == "Ratio" /*&& message.author === ownerID*/)
    {

        const attachment = new Discord.MessageAttachment("./getRatio.gif");

        message.channel.send({files : [attachment]})
        console.log("image envoyé.");

    }

    if (leon.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.react('<:leon:1005520037332914177>');

    }
    const jojo = ["jojo","dio"]

    if (jojo.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply('Is this a JoJo reference ?')
        message.react('<:DIO:1006493436154748958>');

    }

    const tristesse = ["sad","triste","pleurer"]
    const careful = ["vraiment triste"]
    const warns = ["calmer mon bot"]


    if (careful.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("Ohh Pardon 😔")

    }
    else 
    if (tristesse.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("T'es triste ? Arrête")
        message.react('<:yuliacry:1005511957685743717>');
    }

    if (warns.some(word => message.toString().toLowerCase().includes(word)))
    {
        message.reply("Ohh Pardon 😔 j'ai ete coder avec le c*")

    }
    
    /*
    const BannedWords = [
        "salaud","connard","merde"
    ]

        if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) 
        {
            message.delete().catch(e => 
                console.error("Couldn't delete message.")); 
                message.reply(`Pas de mot pareil en ces lieux !`)
        };
   */

    if(message.content === prefix + "roleColor")
    {    
        const embed = new Discord.MessageEmbed()

            .setColor("#d60000")
            .setTitle("Choisis une nouvelle couleur parmi ceux que tu as déjà")
            .setDescription("*Permet de changer de couleur*")
            .setTimestamp()
            .setFooter("Finishim.G.D.B is the owner of this bot")

        let roleSelect = message.reply(
            {
                embeds: [embed],fetchReply:true
            });
        roleSelect.react('<:yuliacry:1005511957685743717>');
    }
});



/////////////////////////////////////////////////

//Gestion des arrivee et depart d'un membre

client.on("guildMemberAdd", async member => 
{
    console.log("un membre est arrivé.");
    client.channels.cache.get("764244233972351060").send("<@" + member.id +"> est arrivé");
    member.roles.add("1003241072484429844")

    var canvas = Canvas.createCanvas(840 , 400);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./redBackground.png");
    ctx.drawImage(background, 0,0,840 , 400);

    ctx.font = "900 37px OCR A Extended";
    ctx.fillStyle = "#ff4800";
    ctx.textAlign = "center";
    ctx.fillText("Bienvenue à toi " + member.user.tag.toUpperCase(), 420, 310)
      
    var avatarProfile = await Canvas .loadImage(member.user.displayAvatarURL({
        format: "png",
        size : 1024
    }));

    ctx.beginPath();
    ctx.arc(410,140,100,0,Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    

    ctx.drawImage(avatarProfile, 305, 35, 208, 208);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(),"welcome.png");

    client.channels.cache.get("764244233972351060").send({files:[attachment]});
});

client.on("guildMemberRemove", async member => 
{
    console.log("un membre est parti.");
    client.channels.cache.get("764244233972351060").send("<@" + member.id +"> est parti");

    
    var canvas = Canvas.createCanvas(840 , 400);

    ctx = canvas.getContext("2d");

    var background = await Canvas.loadImage("./redBackground.png");
    ctx.drawImage(background, 0,0,840 , 400);

    ctx.font = "900 37px OCR A Extended";
    ctx.fillStyle = "#ff4800";
    ctx.textAlign = "center";
    ctx.fillText("A bientôt " + member.user.tag.toUpperCase(), 420, 310)
      
    var avatarProfile = await Canvas .loadImage(member.user.displayAvatarURL({
        format: "png",
        size : 1024
    }));

    ctx.beginPath();
    ctx.arc(410,140,100,0,Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    

    ctx.drawImage(avatarProfile, 305, 35, 208, 208);

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(),"welcome.png");

    client.channels.cache.get("764244233972351060").send({files:[attachment]});
});
