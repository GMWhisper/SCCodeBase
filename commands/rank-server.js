// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'rank-server',
    description: 'Change the rank the characters on the server.',
    aliases: ['level-up'],
    usage: '[max server level]',
    execute(message, args) {
        // permissions check
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master") || !message == null)
            message.channel.send('You do not have permission to run this command.');
        else {

            if (data.tier1Level >= 17) {
                data.serverTier = 3;
                data.tier2Level = args[0] - 4;
                data.tier2Level = args[0] - 8;
            }

            else if (data.tier1Level >= 11) {
                data.serverTier = 2;
                data.tier2Level = args[0] - 4;
            }

            else {
                data.tier1Level = args[0];
            }

            fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Data entered."); // Success );
            });
        }
    }
}
