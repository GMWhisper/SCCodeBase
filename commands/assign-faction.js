// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'assign-faction',
    description: 'Commit a character to one of the three factions.',
    aliases: [],
    usage: '[@player] [Faction name]',
    execute(message, args) {
        var factionName = args[1];
        for (arg of args) {
            if (arg == args[1] || arg == args[0])
                continue;
            if (arg != null) {
                factionName = factionName + ' ' + arg;
            }
        }

        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master") && character.factionName != 'Undecided') {
                    message.channel.send("This character is already a member of a faction.  This decision can not be changed except by a DM.");
                    return;
                }
                else
                    character.faction = factionName;
                message.channel.send("Congratulations, " + character.fullName + " is now a proud member of the " + factionName + ".");
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {
            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}