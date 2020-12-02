// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

//TODO: Add sigil, add metadata for number of quests and last quest done
module.exports = {
    name: 'add-quest',
    description: 'Add a new quest to the database.',
    aliases: ['quest'],
    usage: '[@DM] [quest name]',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        var questName = '';
        for (arg of args) {
            if (arg == args[0])
                continue;
            if (arg != null) {
                questName = questName + arg + ' ';
            }
        }

        // make the new character
        var newQuest = {
            owner: args[0].replace('<@!', '').replace('<@', '').replace('>', ''),
            name: questName,
            id : data.numberOfQuests
        }

        data.quests.push(newQuest);

        data.numberOfQuests += 1;

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );

            message.channel.send('Your quest was successfully submitted to the database.');
        });
    }
}