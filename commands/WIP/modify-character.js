// file system module to perform file operations
let data = require('../../databases/data.json') 
const fs = require('fs');

module.exports = {
	name: 'modify-character',
    description: 'Modifies a character in the database.',
    aliases: ['modify'],
    usage: '[@player] [option] [new entry]',
	execute(message, args) {
        for(character of data.characters) {
            if (message.author.id == character.owner) {
                
            }
        }
        
        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}
