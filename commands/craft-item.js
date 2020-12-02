// file system module to perform file operations
let data = require('../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'craft-item',
    description: 'Spend gold and downtime on a character to create an item.',
    aliases: ['craft'],
    usage: '*[assistant] *[consumable] [tier] [rarity] *[gold cost]\nGold cost only required for mundane common items',
    execute(message, args) {
        var consumableMod = 1;
        var assistantDT = 1;
        var assistantGold = 1;

        if(args[0] == 'assistant') {
            assistantDT = .5;
            assistantGold = 1.5;
            args.shift();
        }

        if (args[0] == 'consumable') {
            consumableMod = .5;
            args.shift();
        }

        for (character of data.characters) {
            for (item of data.itemTypes) {
                if (item.name.toLowerCase() == args[0].toLowerCase() + ' ' + args[1].toLowerCase()) {
                    if (message.author.id == character.owner) {
                        if (character.gold < item.gold * assistantGold || character.downtime < item.downtime * assistantDT * consumableMod) {
                            message.channel.send("You do not have enough gold or downtime to craft this item, please check the requirements in the crafting channels.");
                            return;
                        }

                        if (item.name == "Mundane Common") {
                            if (args)

                            var spentGold = (args[2] / 2) * assistantGold;
                            var spentDowntime = (args[2] / item.gold) * item.downtime * assistantDT;

                            if (character.gold < spentGold || character.downtime < spentDowntime) {
                                message.channel.send("You do not have enough gold or downtime to craft this item, please check the requirements in the crafting channels.");
                                return;
                            }

                            character.gold = character.gold - spentGold;
                            character.downtime = character.downtime - spentDowntime;
                            message.channel.send("You have spent " + spentGold + " gold and " + spentDowntime + ' downtime to craft mundane items.');
                            return;
                        }

                        else {
                            character.gold = character.gold - (item.gold * assistantGold);
                            character.downtime = character.downtime - (item.downtime * consumableMod * assistantDT);
                            message.channel.send("You have spent " + item.gold * assistantGold + " gold and " + item.downtime * consumableMod * assistantDT + " downtime to craft one " + item.name + " rarity item.");
                        }

                        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                            // Checking for errors 
                            if (err) throw err;

                            console.log("Done writing"); // Success );
                        });

                        return;
                    }
                }
            }
        }
        message.channel.send("You did not enter a valid item type, please check your spelling and try again.");
    }
}
