// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'visit-elders',
    description: 'List all of the retired characters on the server.',
    aliases: ['elders'],
    usage: '',
    execute(message, args) {
        var listOfCharacters = '';

        for (character of data.characters) {
            if (character.status == "Retired") {
                listOfCharacters = listOfCharacters + character.fullName + ' of ' + character.faction + '\n';
            }
        }

        message.channel.send(listOfCharacters);
    }
}