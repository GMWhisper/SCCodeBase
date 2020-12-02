// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'transfer-gold',
    description: 'Give gold from the first character to the second character mentioned.',
    aliases: ['transfer'],
    usage: '[@player from] [@player to] [new gold amount]',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        if (isNaN(args[2]) || args[2] < 0) {
            message / channel.send("You must transfer a positive amount of gold.");
            return;
        }

        else {
            for (character of data.characters) {
                if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                    for (character2 of data.characters) {
                        if (args[1].replace('<@!', '').replace('<@', '').replace('>', '') == character2.owner) {
                            if (character.gold < args[2]) {
                                message.channel.send("Not enough gold to complete transfer, no gold was exchanged.");
                                return;
                            }
                            character.gold = character.gold - Number(args[2]);
                            character2.gold = character2.gold + Number(args[2]);
                            message.channel.send("Transfer of " + args[2] + " gold completed.\n"
                                + character.fullName + "'s new gold total is " + character.gold + '.\n'
                                + character2.fullName + "'s new gold total is " + character2.gold + '.');
                        }
                    }
                }

                fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                    // Checking for errors 
                    if (err) throw err;

                    console.log("Done writing"); // Success );
                });
            }
        }
    }
}