// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'transcribe-spellbook',
    description: 'Transcribe a spell from a scroll or spellbook into your spellbook.',
    aliases: ['transcribe', 'spellbook'],
    usage: '[# of spells] [spell level]\nCantrips cannot be transcribed.',
    execute(message, args) {
        var goldCost;
        var downtimeCost;

        for (character of data.characters) {
            if (message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if (!isNaN(args[0]) && args[0] > 0) {
                    goldCost = 50 * args[0] * args[1];
                    downtimeCost = .25 * args[0] * args[1];
                }
                else {
                    message.channel.send("You did not enter a positive number of spells to transcribe.")
                }

                if (character.gold < goldCost || character.downtime < downtimeCost) {
                    message.channel.send("You do not have enough gold or downtime to scribe scrolls of this level.");
                }
                else {
                    character.gold -= goldCost;
                    character.downtime -= downtimeCost;
                    message.channel.send("You spent" + goldCost + " gold and " + downtimeCost + " downtime to scribe " + args[0] + " scrolls.");
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
