// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'change-gold',
    description: 'Give gold to a character.',
    aliases: ['cg'],
    usage: '[@player] [+/-][new gold amount]\nPlus or minus are optional',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }
        else {
            for (character of data.characters) {
                if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                    if (args[1].match(/\+.*/)) {
                        character.gold = character.gold + Number(args[1].slice(1));
                    }
                    else if (args[1].match(/-.*/)) {
                        character.gold = character.gold - Number(args[1].slice(1));
                    }
                    else {
                        character.gold = Number(args[1]);
                    }
                    message.channel.send(character.fullName + "'s current gold total is now: " + character.gold);
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
