// file system module to perform file operations
let data = require('../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'repay-debt',
    description: 'Spend gold to clear your debt.',
    aliases: ['repay'],
    usage: '',
    execute(message, args) {

        for (character of data.characters) {
            if (message.author.id == character.owner) {
                if (character.gold >= character.debt) {
                    character.gold -= character.debt;
                    character.debt = 0;
                    message.channel.send("You repaid your debts in full and have " + character.gold + " gold remaining.");
                }
                else {
                    character.debt -= character.gold;
                    character.gold = 0;
                    message.channel.send("You repaid what debt you could afford to repay and only have " + character.debt + " more gold before you are debt free.");
                }
            }

            fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );
            });
        }
    }
}
