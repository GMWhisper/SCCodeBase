// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'visit-graveyard',
    description: 'List all of the dead characters on the server.',
    aliases: ['graveyard'],
    usage: '',
    execute(message, args) {
        var listOfCharacters = '';

        for (character of data.characters) {
            if (character.status == "Dead") {
                listOfCharacters = listOfCharacters + character.fullName + ' of ' + character.faction + '\n';
            }
        }

        message.channel.send(listOfCharacters);
    }
}
