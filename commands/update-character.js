// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'update-character',
    description: 'Update many aspects of an existing character.',
    aliases: ['update'],
    usage: '[@player] [gold|downtime|sigil|name|col|class|race] [new value]',
    execute(message, args) {
        console.log(args)

        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        for (character of data.characters) {

            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                var index = 1;

                while (index < args.length) {
                    if (args[index] == 'name') {
                        index++;
                        character.firstName = args[index];
                        index++;
                        character.lastName = args[index];
                        character.fullName = character.firstName + ' ' + character.lastName;
                        index++;
                        continue;
                    }
                    else if (args[index] == 'downtime') {
                        index++;
                        character.downtime = Number(args[index]);
                        index++
                        continue;
                    }
                    else if (args[index] == 'sigil') {
                        index++;
                        character.sigil = args[index];
                        index++
                        continue;
                    }
                    else if (args[index] == 'col') {
                        index++;
                        character.costOfLiving = args[index];
                        index++;
                        continue;
                    }
                    else if (args[index] == 'gold') {
                        index++;
                        character.gold = Number(args[index]);
                        index++;
                        continue;
                    }
                    else if (args[index] == 'class') {
                        index++;
                        character.class = args[index];
                        index++;
                        continue;
                    }
                    else if (args[index] == 'race') {
                        index++;
                        character.race = args[index];
                        index++;
                        continue;
                    }
                    else if (args[index] == 'subclass') {
                        index++;
                        character.subClass = args[index];
                        index++;
                        continue;
                    }
                    else {
                        continue;
                    }
                }
                message.channel.send(character.fullName + " has been updated.");
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}
