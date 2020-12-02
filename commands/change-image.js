// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'change-image',
    description: 'Change your character artwork.',
    aliases: ['ci'],
    usage: '*[@player] [image url]\nIf @player is not included, the sender of the message will be chosen by default.',
    execute(message, args) {
        var success = false;
        var imageLink;

        if (!args[0].match(/<.*/)) {
            imageLink = args[0];
            args[0] = message.author.id;
        }
        else {
            imageLink = args[1];
        }

        if (imageLink.slice(-4) != ".jpg" && imageLink.slice(-4) != ".png" && imageLink.slice(-5) != ".jpeg")
        {
            message.channel.send("Invalid image link entered, verify you are using a .jpg, .jpeg, or .png link.");
        }

        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                character.image = imageLink;
                message.channel.send(character.fullName + ' has been assigned new character art.');
                success = true;
            }
        }

        if (success == true) {
            fs.writeFile("databases/data.json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );
            });
        }

        else {
            message.channel.send("Your ")
        }
    }
}
