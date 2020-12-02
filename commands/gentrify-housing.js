// this deducts the proper amount of gold and downtime for a crafted item based on the item's rarity and type

// file system module to perform file operations
let data = require('../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'gentrify-housing',
    description: 'Double all cost of living rates on characters and housing options.',
    aliases: ['gentrify'],
    usage: '',
    execute(message, args) {
        for (lifestyle in data.lifestyles) {
            lifestyle.cost = lifestyle.cost * 2;
        }

        for (character of data.characters) {
            character.costOfLiving = character.costOfLiving * 2;
        }


        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });
    }
}
