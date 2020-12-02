// file system module to perform file operations
const fs = require('fs');
let safety = require('../recovery/safety.json')

module.exports = {
    name: '',
    description: '.',
    aliases: [],
    usage: '',
    execute(message, args) {
        for (var i = 0; i < safety.length; i++) {
            if (safety[i].content.match(/^\!detail-character.*/ || safety[i].content.match(/\!dr/))) {
                console.log(safety.splice(i,1));
            }
            if (safety[i].content.match(/^!withdraw.*/) || safety[i].content.match(/^!deposit.*/)) {
                safety[i].content.replace('!deposit-gold ', '!deposit-gold ' + safety[i].owner);
                safety[i].content.replace('!withdraw-gold ', '!deposit-gold ' + safety[i].owner);
                safety[i].content.replace('!deposit ', '!deposit ' + safety[i].owner);
                safety[i].content.replace('!withdraw ', '!deposit ' + safety[i].owner);
            }
        }

        fs.writeFile("recovery/safety.json", JSON.stringify(safety), err => {

            // Checking for errors 
            if (err) throw err;
    
            console.log("Done writing"); // Success );
        });

        message.channel.send("Reformat complete.");
    }
}
