// file system module to perform file operations
let data = require('../databases/data.json') 
const fs = require('fs');

module.exports = {
	name: 'spend-downtime',
    description: 'Spend downtime on a character in the database.',
    aliases: [],
    usage: '[downtime spent]',
	execute(message, args) {
        if (isNaN(args[0])) {
            message.channel.send("You cannot deduct an amount that is not a number.");
            return;
        }

        for(character of data.characters) {
            if (message.author.id == character.owner) {
                if(args[0] < 0) message.channel.send('You cannot spend negative gold.');
                else if(character.downtime < args[0])
                    message.channel.send('You do not have ' + args[0] + ' downtime to spend.');
                else {
                    character.downtime = Number(character.downtime) - Number(args[0]);
                    message.channel.send(character.fullName + ' has ' + character.downtime + ' downtime remaining.');
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
