// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'tax-server',
    description: 'Every character on the server pays cost of living.',
    aliases: ['tax', 'col'],
    usage: '',
    execute(message, args) {
        // permissions check
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master") || !message == null)
            message.channel.send('You do not have permission to run this command.');
        else {
                for (character of data.characters) {
                    if (character.status != "Alive") {
                        continue;
                    }
                    if (character.gold > character.costOfLiving) {
                        character.gold -= character.costOfLiving;
                    }
                    else {
                        var debt = character.costOfLiving - character.gold;
                        character.gold = 0;
                        character.debt = debt;
                    }
                    character.downtime = character.downtime + 7;
                }

                fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                    // Checking for errors 
                    if (err) throw err;

                    console.log("Tax day is done."); // Success );
                });
                message.channel.send("Cost of living has been taken and downtime given.")

                var totalGold = 0;
                for (character of data.characters) {
                    if (character.status == 'Alive')
                        totalGold = Number(totalGold) + Number(character.gold);
                }
                message.channel.send("The total sum of gold on the server is currently: " + totalGold);

                var totalDowntime = 0;
                for (character of data.characters) {
                    if (character.status == 'Alive')
                        totalDowntime = Number(totalDowntime) + Number(character.downtime);
                }
                message.channel.send("The total sum of downtime on the server is currently: " + totalDowntime);
        }
    }
}
