// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

//TODO: Add sigil, add metadata for number of quests and last quest done
module.exports = {
    name: 'new-character',
    description: 'Add a new character to the character database.',
    aliases: ['new'],
    usage: '[@player] [character first name] [character last name] [image url] [sigil] *[starting gold] *[starting downtime]\nStarting gold and downtime are optional',
    execute(message, args) {
        if (args[2] == '-') {
            args[2] = '';
        }

        // check that the server has high enough tier for a new character
        var numChars = 0;

        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                numChars++;
            }

            if (numChars >= data.serverTier) {
                message.channel.send("You already have as many characters as you can have.")
                return;
            }
        }

        // ensure new character has a unique fullName, message and return if not true
        for (character of data.characters) {
            if (character.fullName == args[1] + ' ' + args[2]) {
                message.channel.send("This character already exists, please choose a different name.")
                return;
            }
        }

        var newGold;
        var newDowntime;

        if (args[3] == null) args[3] = '';
        if (args[5] == null) newGold = 200; else newGold = Number(args[5]);
        if (args[6] == null) newDowntime = 7; else newDowntime = Number(args[6]);

        // make the new character
        var newChar = {
            firstName: args[1],
            lastName: args[2],
            fullName: args[1] + ' ' + args[2].trim(),
            image: args[3],
            sigil: args[4],
            owner: args[0].replace('<@!', '').replace('<@', '').replace('>', ''),
            gold: newGold,
            downtime: newDowntime,
            costOfLiving: 25,
            lifestyle: "Common Apartment",
            nextRez: 1500,
            status: 'Alive',
            debt: 0,
            faction: 'Undecided',
            bankStatus: "Deposit",
            bankAmount: 0,
            charSlot: numChars + 1,
            state: 'Inactive',
            gamesPlayed: 0,
            gamesRun: 0
        }

        data.characters.push(newChar);

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}