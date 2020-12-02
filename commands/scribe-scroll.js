// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json');

module.exports = {
    name: 'scribe-scroll',
    description: 'Scribe a spell onto a scroll for later use.',
    aliases: ['scribe', 'scroll'],
    usage: '[# of spells] [spell level (c for cantrip)]',
    execute(message, args) {
        var goldCost = 0.0;
        var downtimeCost = 0.0;
        var messageToSend;

        for (character of data.characters) {
            if (message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if ((!isNaN(args[1]) || args[1] == 'c') && args[0] > 0) {
                    if (args[1] == 'c') {
                        goldCost += 15 * args[0];
                        downtimeCost += 1 * args[0];
                        messageToSend = "You have crafted " + args[0] + " Cantrip scrolls.";
                    }
                    if (args[1] == '1') {
                        goldCost += 25 * args[0];
                        downtimeCost += 1 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 1st level scrolls.";
                    }
                    if (args[1] == '2') {
                        goldCost += 250 * args[0];
                        downtimeCost += 2 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 2nd level scrolls.";
                    }
                    if (args[1] == '3') {
                        goldCost += 500 * args[0];
                        downtimeCost += 3 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 3rd level scrolls.";
                    }
                    if (args[1] == '4') {
                        goldCost += 2500 * args[0];
                        downtimeCost += 5 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 4th level scrolls.";
                    }
                    if (args[1] == '5') {
                        goldCost += 5000 * args[0];
                        downtimeCost += 7 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 5th level scrolls.";
                    }
                    if (args[1] == '6') {
                        goldCost += 15000 * args[0];
                        downtimeCost += 10 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 6th level scrolls.";
                    }
                    if (args[1] == '7') {
                        goldCost += 25000 * args[0];
                        downtimeCost += 20 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 7th level scrolls.";
                    }
                    if (args[1] == '8') {
                        goldCost += 50000 * args[0];
                        downtimeCost += 35 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 8th level scrolls.";
                    }
                    if (args[1] == '9') {
                        goldCost += 250000 * args[0];
                        downtimeCost += 55 * args[0];
                        messageToSend = "You have crafted " + args[0] + " 9th level scrolls.";
                    }
                }
                else {
                    message.channel.send("You did not enter a positive number of scrolls to scribe.");
                    return;
                }

                if (character.gold < goldCost || character.downtime < downtimeCost) {
                    message.channel.send("You do not have enough gold or downtime to scribe scrolls of this level.");
                    return;
                }
                else {
                    character.gold -= goldCost;
                    character.downtime -= downtimeCost;
                    message.channel.send(messageToSend + "\nYou spent" + goldCost + " gold and " + downtimeCost + " downtime to scribe " + args[0] + " scrolls.");
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
