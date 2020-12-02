// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

//TODO: Add sigil, add metadata for number of quests and last quest done
module.exports = {
    name: 'remove-quest',
    description: 'Remove a quest from the database.',
    aliases: [],
    usage: '[quest ID]',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        var questFound = false;

        for (quest of data.quests) {
            if (quest.id == args[0]) {
                data.quests.splice(quest, 1);
                data.numberOfQuests -= 1;
                questFound = true;
            }
        }

        if (questFound == false) {
            message.channel.send("No quest found with the entered ID, please double check and try again.");
            return;
        }

        else {
            var index = 0;
            for (quest of data.quests) {
                quest.number = index;
                index++;
            }
        }

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );

            message.channel.send('Your quest was successfully removed from the database.');
        });
    }
}