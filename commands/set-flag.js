// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

//TODO: Add sigil, add metadata for number of quests and last quest done
module.exports = {
    name: 'set-flag',
    description: 'Sets a database flag.',
    aliases: ['flag'],
    usage: '[flag name] [new flag state]\ncurrent flags: questReady (true/false)',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        if (args[0] == 'questReady') {
            if (args[1] == "true") {
                data.questFindable = true;
            }
            else if (args[1] == "false") {
                data.questFindable = false;
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });

        message.channel.send(args[0] + ' flag has been set to ' + args[1]);
    }
}