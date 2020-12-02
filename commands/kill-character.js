// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'kill-character',
    description: 'Declare a character dead and unlink them from their owner in the database.',
    aliases: ['kill'],
    usage: '*[permanent/temporary] [@player OR character full name]',
    execute(message, args) {
        var permaDeath = false;
        var deathMessage = '';

        if (args[0] == 'permanent') {
            permaDeath = true;
            args.shift();
        }

        // permissions check
        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master"))
            message.channel.send('You do not have permission to run this command.');
        else {
            for (character of data.characters) {
                if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner || heroFullName == character.fullName.trim()) {
                    if (character.status == 'Dead') {
                        message.channel.send("This character is already dead.  No need to kill them again.");
                        return;
                    }

                    else {
                        if (permaDeath == true) {
                            character.owner = '';
                            deathMessage = "  There is no posibility of that character being revived.  " + args[0] + "'s  character slot has been opened for a new character."
                        }

                        character.status = 'Dead';
                        character.gold = 0;
                        character.downtime = 0;
                        message.channel.send("You have declared " + character.fullName + " dead." + deathMessage);
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
