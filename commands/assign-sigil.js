// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'assign-sigil',
    description: 'Commit a character to one of the seventeen sigils.',
    aliases: [],
    usage: '[@player] [sigil name]',
    execute(message, args) {
        var sigilName = args[1];
        for (arg of args) {
            if (arg == args[1] || arg == args[0])
                continue;
            if (arg != null) {
                sigilName = sigilName + ' ' + arg;
            }
        }

        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
                    message.channel.send("This character is already assigned a sigil.  This decision can not be changed except by a DM.");
                    return;
                }
                else
                    character.sigil = sigilName;
                message.channel.send("Congratulations, " + character.fullName + " is marked with the " + sigilName + " sigil.  Fate cannot control you anymore.");
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {
            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}