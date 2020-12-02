// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'destroy-character',
    description: 'Remove a character entirely from the character database.',
    aliases: ['destroy'],
    usage: '[firstname] [lastname]',
    execute(message, args) {
        // permissions check
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master"))
            message.channel.send('You do not have permission to run this command.');
        else {
            for (character of data.characters) {
                if (args[0] + ' ' + args[1] == character.fullName) {
                    data.characters.pull(character);
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
