// file system module to perform file operations
let data = require('../databases/data.json') 
const fs = require('fs');

module.exports = {
	name: 'spend-gold',
    description: 'Spend gold on a character in the database.',
    aliases: [],
    usage: '[gold spent]',
	execute(message, args) {
        if (isNaN(args[0])) {
            message.channel.send("You cannot deduct an amount that is not a number.");
            return;
        }

        for(character of data.characters) {
            if (message.author.id == character.owner) {
                if(args[0] < 0) message.channel.send('You cannot spend negative gold.');
                else if(character.gold < args[0])
                    message.channel.send('You do not have ' + args[0] + ' gold to spend.');
                else {
                    character.gold = Number(character.gold) - Number(args[0]);
                    message.channel.send(character.fullName + ' has ' + character.gold + ' gold remaining.')
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
