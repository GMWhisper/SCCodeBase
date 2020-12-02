// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json');

module.exports = {
    name: 'spell-versatility',
    description: 'Change one known spell for another in the same spell list.',
    aliases: ['versatile'],
    usage: '[]',
    execute(message, args) {
        for (character of data.characters) {
            if (message.author.id == character.owner) {
                character.downtime = Number(character.downtime) - 1;
                message.channel.send(character.fullName + ' has spent 1 downtime and has ' + character.downtime + ' downtime remaining.');
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}
