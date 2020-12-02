// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')
const Discord = require('discord.js');

module.exports = {
    name: 'detail-character',
    description: 'Return a detailed description of the character.',
    aliases: ['detail'],
    usage: '[@player]',
    execute(message, args) {
        for (character of data.characters) {
            if (args[0] == null) args[0] = message.author.id;
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                var charRace;
                var charClass;
                var charSubClass;

                if (!character.race) charRace = ' '; else charRace = character.race;
                if (!character.class) charClass = ' '; else charClass = character.class;
                if (!character.subClass) charSubClass = ' '; else charSubClass = character.subClass;

                try {
                const charEmbed = new Discord.MessageEmbed()
                    .setTitle(character.fullName)
                    .setImage(character.image)
                    .addField("Status", character.status)
                    .addField("Faction", character.faction)
                    .addField("Sigil", character.sigil)
//                    .addField("Race", charRace)
//                    .addField("Class", charClass)
//                    .addField("SubClass", charSubClass)
                    .addField("Gold", character.gold)
                    .addField("Downtime", character.downtime)
                    .addField("Debt", character.debt)
                    .addField("Next Resurrection Cost", character.nextRez)
                    .addField("Cost of Living", character.lifestyle + ' (' + character.costOfLiving + ')');

                message.channel.send(charEmbed);
                }
                catch {
                    message.channel.send("Character name: " + character.fullName + 
                    "\nStatus: " + character.status + 
                    "\nFaction: " + character.faction + 
                    "\nSigil: " +character.sigil +
                    "\nGold: " + character.gold + 
                    "\nDowntime: " + character.downtime + 
                    "\nDebt: " + character.debt +
                    "\nNext ressurection cost: " + character.nextRez +
                    "\nCost of Living: " + character.costOfLiving
                    , {files: [character.image]})
                }
            }
        }
    }
}
