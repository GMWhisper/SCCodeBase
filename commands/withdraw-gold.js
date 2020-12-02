// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'withdraw-gold',
    description: 'Withdraw gold from the bank to use on Chronica.',
    aliases: ['withdraw'],
    usage: '[@player] [gold amount]',
    execute(message, args) {
        for (character of data.characters) {

            if (isNaN(args[0]) || args[0] < 0) {
                message.channel.send("Please specify a positive amount of gold to withdraw.");
                return;
            }

            if (message.author.id == character.owner) {
                if (character.bankStatus == "Withdraw") {
                    message.channel.send("You have a withdrawl out already, use deposit-gold first.");
                    return;
                }
                if (Number(character.gold) < Number(args[0])) {
                    message.channel.send("You do not have enough gold to complete this transaction.");
                    return;
                }
                else {
                    character.gold = Number(character.gold) - Number(args[0]);
                    character.bankStatus = "Withdraw";
                    character.bankAmount = Number(args[0]);
                    message.channel.send("You withdrew " + args[0] + " gold, now go spend it on Chronica!");
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