
// file system module to perform file operations
let data = require('../../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'conduct-business',
    description: 'Runs all businesses in Phoenix to determine if a profit or loss has been made during the previous week.',
    aliases: ['income'],
    usage: '',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }
        else {
            for (business of data.businesses) {
                for (character of data.characters) {
                    if (business.owner == character.owner) {
                        if (business.overtime == true) {
                            if (character.downtime < 2) {
                                message.channel.send(character.fullName + ' does not have enough downtime to run ' + business.name + ' in OT.  The business will close for the weekend.');
                                business.overtime = false;
                            }
                            else {
                                message.channel.send(character.fullName + ' is running ' + business.name + ' in OT this week.  The business will remain open over the weekend.');
                                character.downtime -= 2;
                            }
                        }

                        message.channel.send(character.fullName + ' has ' + character.gold + ' gold currently before income for ' + business.name + ' has been rolled.');

                        // random logic and message with results here
                        var rand = Math.ceil(Math.random() * 100) + business.bonus;
                        var smallProfit = rollDice(5, 6) * 5;
                        var midProfit = rollDice(10, 8) * 5;
                        var largeProfit = rollDice(15, 10) * 5;
                        var smallOTProfit = rollDice(7, 6) * 7;
                        var midOTProfit = rollDice(14, 8) * 7;
                        var largeOTProfit = rollDice(21, 10) * 7;

                        if (rand <= 10) {
                            if (business.overtime == false) {
                                message.channel.send("Your business did horribly, you have lost 150 gold this week.");
                                character.gold -= 150;
                            }
                            else {
                                message.channel.send("Your business did horribly, you have lost 200 gold this week.");
                                character.gold -= 200;
                            }
                        }
                        else if (rand <= 20) {
                            if (business.overtime == false) {
                                message.channel.send("Your business did badly this week, you have lost 100 gold.");
                                character.gold -= 100;
                            }
                            else {
                                message.channel.send("Your business did badly this week, you have lost 150 gold this week.");
                                character.gold -= 150;
                            }
                        }
                        else if (rand <= 40) {
                            if (business.overtime == false) {
                                message.channel.send("Your business failed to meet margins this week, you have lost 50 gold.");
                                character.gold -= 50;
                            }
                            else {
                                message.channel.send("Your business failed to meet margins this week, you have lost 100 gold this week.");
                                character.gold -= 100;
                            }
                        }
                        else if (rand <= 60) {
                            message.channel.send("Your business broke even this week, nothing gained or lost.");
                        }
                        else if (rand <= 80) {
                            if (business.overtime == false) {
                                message.channel.send("You made some profit this week, you gained " + smallProfit + " gold.");
                                character.gold += smallProfit;
                            }
                            else {
                                message.channel.send("You made some profit this week, you gained " + smallOTProfit + " gold.");
                                character.gold += smallOTProfit;
                            }
                        }
                        else if (rand <= 90) {
                            if (business.overtime == false) {
                                message.channel.send("You made decent profit this week, you gained " + midProfit + " gold.");
                                character.gold += midProfit;
                            }
                            else {
                                message.channel.send("You made decent profit this week, you gained " + midOTProfit + " gold.");
                                character.gold += midOTProfit;
                            }
                        }
                        else if (rand <= 120) {
                            if (business.overtime == false) {
                                message.channel.send("You made a lot of profit this week, you gained " + largeProfit + " gold.");
                                character.gold += largeProfit;
                            }
                            else {
                                message.channel.send("You made a lot of profit this week, you gained " + largeOTProfit + " gold.");
                                character.gold += largeOTProfit;
                            }
                        }

                        message.channel.send(character.fullName + ' has ' + character.gold + ' gold after income for ' + business.name + ' has been rolled.');
                    }
                }

                fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                    // Checking for errors 
                    if (err) throw err;

                    console.log("Done writing"); // Success );
                });
            }
        }

        function rollDie(sizeDie) {
            return Math.ceil(Math.random() * sizeDie);
        }

        function rollDice(numDice, sizeDie) {
            var index = 0;
            var diceSum = 0;

            while (index < numDice) {
                diceSum = diceSum + rollDie(sizeDie);
                index++;
            }

            return diceSum;
        }
    }
}