// file system module to perform file operations
const fs = require('fs');
let data = require('../../databases/data.json')

module.exports = {
    name: 'register-player',
    description: 'Add a new player to the database.',
    aliases: ['register'],
    usage: '[@player] [nickname]',
    execute(message, args) {

        var newPlayer;

        for (player of data.players) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == player.owner) {
                message.channel.send("This player is already registered.");
                return;
            }
        }

        newPlayer = {
            owner: args[0].replace('<@!', '').replace('<@', '').replace('>', ''),
            alias: args[1]
        }

        data.players.push(newPlayer);

        fs.writeFile("databases/data.json", JSON.stringify(data), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success );
        });

        message.channel.send(args[0] + ' has been added with the alias ' + args[1] + '.');
    }
}