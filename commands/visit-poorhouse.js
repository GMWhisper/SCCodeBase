// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'visit-poorhouse',
    description: 'List all of the characters on the server that are in debt.',
    aliases: ['poorhouse'],
    usage: '',
    execute(message, args) {
        var listOfCharacters = '';

        for (character of data.characters) {
            if (character.debt > 0) {
                listOfCharacters = listOfCharacters + character.fullName + ' of ' + character.faction + '\n';
            }
        }

        message.channel.send(listOfCharacters);
    }
}