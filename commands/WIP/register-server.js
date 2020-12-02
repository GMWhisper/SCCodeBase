// file system module to perform file operations
const fs = require('fs');
let data = require('../../databases/data.json')

module.exports = {
    name: 'register-server',
    description: 'Add all new players to the database.',
    usage: '',
    execute(message, args) {


// Get the Guild and store it under the variable "list"
const list = client.guilds.get("635180012718260280"); 

// Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
list.members.forEach(member => console.log(member.user.username)); 

// check fo dm rights

// for all users on the guild

// check for adventurer role

// check if player is already in file

// add the player to the data file if not already
        var newPlayer;

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