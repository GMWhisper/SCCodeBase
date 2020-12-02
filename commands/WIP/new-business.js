//used to register a new business to a player and associate a bonus to that business
// file system module to perform file operations
let data = require('../../databases/data.json')
const fs = require('fs');
const { Channel } = require('discord.js');

module.exports = {
    name: 'new-business',
    description: 'Creates a new business and assigns it to a player.',
    aliases: [],
    usage: '[@player] [modifier] [business name]',
    execute(message, args) {
        var businessName = args[2];
        for (arg of args) {
            if (arg == args[1] || arg == args[0] || arg == args[2])
                continue;
            if (arg != null) {
                businessName = businessName + ' ' + arg;
            }
        }

        var businessCost = 1500;

        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if (character.gold < businessCost) {
                    message.channel.send(charaacter.fullName + ' does not have enough gold to purchase a business.');
                    return;
                }

                character.gold -= businessCost;

                var newBusi = {
                    name: businessName,
                    modifier: args[1],
                    owner: character.owner
                }

                data.businesses.push(newBusi);

                fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                    // Checking for errors 
                    if (err) throw err;

                    console.log("Done writing"); // Success );
                });

                message.channel.send(businessName + ' has been established by ' + character.fullName + '.');
            }
        }

        // no player found, throw an error message to discord
    }
}