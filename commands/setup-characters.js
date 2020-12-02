// file system module to perform file operations
let data = require('../databases/data.json') 
const fs = require('fs');

module.exports = {
	name: 'setup-characters',
    description: 'Add new attributes to characters in the database.',
    aliases: [],
    usage: '[]',
	execute(message, args) {
        for(character of data.characters) {
            character.gamesPlayed = 0;
            character.gamesRun = 0;
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}