// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'resolve-quest',
    description: 'Spend DT from characters going on a quest.',
    aliases: ['quest', 'reward'],
    usage: '[DT spent] *[gold adjustment] [@player]s\nGold adjustment is optional and must start with a + or -, add - after a mention to not spend DT or give gold to that character.',
    execute(message, args) {
        // permissions check
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master"))
            message.channel.send('You do not have permission to run this command.');
        else {

            var DmName = args[args.length - 1].replace('<@!', '').replace('<@', '').replace('>', '');

            for (character of data.characters) {
                if (character.owner == message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') && message.author.id == args[index]) {
                    character.gamesRun++;
                }
            }

            // check that arg[0] is a number and all other args are mentions
            if (isNaN(args[0])) {
                message.channel.send("You must include the downtime cost first, then mention participating players.");
                return;
            }

            // take downtime from participants
            var index = 1;
            var rewardModifier = Number(args[1]);
            var messageToSend = 'Enrollment:\n';
            var crimeTax = .15;

            while (index < args.length) {
                if (index == 1 && !isNaN(rewardModifier)) {
                    index++;
                    continue;
                }
                else if (index == 1) {
                    rewardModifier = 0;
                    args[index] = args[index].replace('<@!', '').replace('<@', '').replace('>', '');
                }
                else {
                    args[index] = args[index].replace('<@!', '').replace('<@', '').replace('>', '');
                }

                for (character of data.characters) {
                    if (args[index] == character.owner && character.owner != "") {
                        if (character.downtime < args[0]) {
                            messageToSend = messageToSend + character.fullName + ' does not have enough downtime to go on this quest.  They will not recieve a reward.\n';
                            args[index] = 0;
                            if (character.owner != DmName) {
                                character.gamesPlayed++;
                            }
                        }
                        else {
                            character.downtime -= args[0];
                            messageToSend = messageToSend + character.fullName + " has joined the quest for " + args[0] + " downtime, " + character.downtime + " downtime remaining.\n";
                            if (character.owner != DmName) {
                                character.gamesPlayed++;
                            }
                        }
                    }

                    else if (args[index] == character.owner + "-" && character.owner != "") {
                        if (character.owner != DmName) {
                            character.gamesPlayed++;
                        }
                        messageToSend = messageToSend + character.fullName + ' has chosen not to spend downtime on this quest.  They will not recieve a reward.\n';
                        args[index] = 0;
                    }
                }
                index++;
            }

            //give gold to participants that spent DT
            var index = 1;

            messageToSend = messageToSend + 'Rewards:\n';

            var reward = ((2.5 + (.5 * Number(args[0]))) * (data.tier1Level ** 2.75) + rewardModifier) * (1 - crimeTax);
            reward = Math.floor(reward);
//          var reward = (2.5 + (.5 * Number(args[0]))) * (data.tier1Level ** 2.5) + rewardModifier;

            while (index < args.length) {
                for (character of data.characters) {
                    if (args[index] == character.owner && character.owner != "") {
                        character.gold = Number(character.gold) + reward;
                        messageToSend = messageToSend + character.fullName + " has been awarded " + reward + " gold and now has " + character.gold + " gold.\n";
                    }
                }
                index++;
            }
            message.channel.send(messageToSend);

            fs.writeFile("databases/data.json", JSON.stringify(data), err => {
                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );
            });
        }
    }
}
