// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'join-faction',
    description: 'Commit a character to one of the three factions.',
    aliases: ['join'],
    usage: '[faction name]',
    execute(message, args) {
        var factionName = args[0];
        for (arg of args) {
            if (arg == args[0]) 
                continue;
            if (arg != null) {
                factionName = factionName + ' ' + arg;
            }
        }

        for (character of data.characters) {
            if (message.author.id == character.owner) {
                if (character.faction != 'Undecided' && !message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
                    message.channel.send("This character is already a member of a faction.  This decision can not be changed except by a DM.");
                    return;
                }
                else
                    character.faction = factionName;
                message.channel.send("Congratulations, you are now a proud member of the " + factionName + ".  This choice is irreversible except by a DM.");
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {
            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}