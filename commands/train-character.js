// file system module to perform file operations
let data = require('../databases/data.json') 
const fs = require('fs');

module.exports = {
	name: 'train-character',
    description: 'Spend gold and DT on a character to learn a new tool or language proficiency.',
    aliases: ['train'],
    usage: '[language or tool]',
	execute(message, args) {
        var skillName = '';

        for (arg of args) {
                skillName = skillName + ' ' + arg;
        }

        for(character of data.characters) {
            if (message.author.id == character.owner) {
                if(character.gold < 250 || character.downtime < 25) {
                    message.channel.send('You do not have enough gold or downtime to train, please wait and try again when you do.');
                    return;
                }
                else {
                    character.gold -= 250;
                    character.downtime -= 25;
                    message.channel.send(character.fullName + ' has become proficient with' + skillName + ' and has ' + character.gold + ' gold and ' + character.downtime + ' downtime remaining.');
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
