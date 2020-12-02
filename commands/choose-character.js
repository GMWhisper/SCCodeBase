// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'choose-character',
    description: 'Changes which character you are currently using as active.',
    aliases: ['cc'],
    usage: '[character slot]',
    execute(message, args) {
        for (character of data.characters) {

            if (args[0] > data.serverTier) {
                message.channel.send("You do not have that many character slots, please try again.");
                return;
            }

            for (character of data.characters) {
                if (message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') == character.owner && character.charSlot == args[0]) {
                    //change active state of characters
                    character.state = "Active";

                    for (player of data.players) {
                        if (message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') == player.owner) {
                            player.activeCharacter = character.charSlot;
                            message.channel.send("Your new active character is " + character.fullName);


                            try {
                                message.member.setNickname(character.firstName + ' (' + player.alias + ')');
                            } catch {
                                message.channel.send("Failed to change player nickname.");
                            } 

                        }
                    }
                }

                else if (message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                    character.state = "Inactive";
                }

                else {
                    message.channel.send("You do not have that many character slots, please try again.");
                    return;
                }
            }

            fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );

            });

            message.channel.send(character.fullName + ' is ready to adventure.');
        }
    }
}
