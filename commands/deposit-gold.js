// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'deposit-gold',
    description: 'Deposit gold left over from a Chronica shopping trip.',
    aliases: ['deposit'],
    usage: '[gold amount]',
    execute(message, args) {
        for (character of data.characters) {

            if (isNaN(args[0]) || args[0] < 0) {
                message.channel.send("Please specific a positive amount of gold to deposit.");
                return;
            }

            if (message.author.id == character.owner) {
                if (character.bankStatus == "Deposit") {
                    message.channel.send("You need to withdraw gold before you can deposit, use withdraw-gold first.");
                    return;
                }
                if (Number(args[0]) > Number(character.bankAmount)) {
                    message.channel.send("You can not deposit more gold than you withdrew, please check that you are depositing the proper amount and try again.");
                    return;
                }
                else {
                    character.gold = Number(character.gold) + Number(args[0]);
                    character.bankStatus = "Deposit";
                    character.bankAmount = 0;
                    message.channel.send("You deposited " + args[0] + " gold back into your account.  Please remember to set your Chronica wealth back to 0.");
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