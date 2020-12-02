// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json');

module.exports = {
    name: 'retire-hero',
    description: 'Retire a character that has the required downtime.',
    aliases: ['retire'],
    usage: '[@player OR character full name]',
    execute(message, args) {
        var heroRetired = false;
        var heroFullName;
        if (args.length > 1) {
            heroFullName = args[0] + ' ' + args[1];
        }
        else {
            heroFullName = args[0];
        }


        // permissions check
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master"))
            message.channel.send('You do not have permission to run this command.');
        else {
            for (character of data.characters) {
                if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner || heroFullName == character.fullName.trim()) {
                    if (character.downtime < data.retireCostDT) {
                        message.channel.send(character.fullName + ' does not have enough downtime to retire.');
                        return;
                    }
                    else {
                        message.channel.send(character.fullName + ' has retired from the adventuring life.');
                        character.status = 'Retired';
                        character.owner = '';
                        character.gold = 0;
                        character.downtime = 0;
                        heroRetired = true;
                    }
                }
            }

            fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );
            });

            if (heroRetired == false) message.channel.send("No hero found with that description, please try again.");
        }
    }
}