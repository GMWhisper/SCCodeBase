// file system module to perform file operations
let data = require('../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'begin-expedition',
    description: 'Spend gold and one downtime for a chance to discover something special outside of Phoenix.',
    aliases: ['expedition', 'explore'],
    usage: '',
    execute(message, args) {
        var expeditionCost = 50 * (data.tier1Level - 2);
        var expeditionReward = expeditionCost * 3;
        var questName;
        var questOwner;

        for (character of data.characters) {
            if (message.author.id.replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if (character.gold < expeditionCost || character.downtime < 1) {
                    message.channel.send('You do not have enough gold or DT to spend on an expedition.');
                    return;
                }
                else {
                    character.gold = character.gold - expeditionCost;
                    character.downtime -= 1;
                    var messageBeginning = character.fullName + ' has embarked on an expedition costing ' + expeditionCost + ' gold and has ' + character.gold + ' gold remaining.\n';

                    // random logic and message with results here
                    var rand = Math.ceil(Math.random() * 100);
                    if (rand <= 20) {
                        message.channel.send(messageBeginning + "You encountered monsters too strong for you to face alone that chased you all the way back to Phoenix.  You lost 1 additional downtime running for your life back to safety.");
                        character.downtime -= 1;
                    }

                    else if (rand <= 70) {
                        message.channel.send(messageBeginning + "You didn't manage to find anything of value, but avoided any unwanted trouble as well.");
                    }

                    else if (rand <= 90) {
                        message.channel.send(messageBeginning + "You found a relic during your search that you traded in the marketplace for " + expeditionReward + " gold.");
                        character.gold += expeditionReward;
                    }

                    else {
                        if (data.numberOfQuests == 0 || data.questFindable == false) {
                            message.channel.send(messageBeginning + "You found a relic during your search that you traded in the marketplace for " + expeditionReward + " gold.");
                            character.gold += expeditionReward;
                        }

                        else {
                            var questNum = Math.floor(Math.random() * data.numberOfQuests);

                            for (quest of data.quests) {
                                if (quest.number == questNum) {
                                    questName = quest.name;
                                    questOwner = quest.owner;
                                    break;
                                }
                            }

                            try {
                                message.channel.send(messageBeginning + "The location you explored shows great promise for reward, but the challenges you encountered require additional support.  A new quest has been discovered!\nQuest Name: " + questName + "\nQuest DM: <@!" + questOwner + ">");
                                data.questFindable = false;
                            }

                            catch {
                                message.channel.send(messageBeginning + "No quests are currently available.  A DM will contact you soon with a new quest.")
                            }
                        }
                    }
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
