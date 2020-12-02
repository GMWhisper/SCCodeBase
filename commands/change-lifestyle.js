// file system module to perform file operations
let data = require('../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'change-lifestyle',
    description: 'Change lifestyle of a character to one of the available options.',
    aliases: ['lifestyle'],
    usage: '[lifestyle cost]',
    execute(message, args) {
        var successFlag = false;
        for (character of data.characters) {
            if (message.author.id == character.owner) {
                for (lifestyle of data.lifestyles) {
                    if (args[0] == lifestyle.cost) {
                        message.channel.send("Your old cost of living was: " + character.costOfLiving);
                        character.costOfLiving = Number(args[0]);
                        character.lifestyle = lifestyle.name;
                        message.channel.send("Your new cost of living is: " + character.costOfLiving);
                        successFlag = true;
                    }
                }
            }
        }
        if (successFlag == false) {
            message.channel.send("The value you entered is not a valid lifestyle cost, please check on Chronica for the correct value.")
        }
        else {
            fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );
            });
        }
    }
}
