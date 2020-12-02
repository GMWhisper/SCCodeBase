// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json');

module.exports = {
    name: 'visit-barracks',
    description: 'List all of the active characters on the server.',
    aliases: ['barracks'],
    usage: '*[gold|dt|col|sigil|faction]\n* is optional.',
    execute(message, args) {
        var listOfCharacters = '';
        var charCount = 0;
        var gold = false;
        var dt = false;
        var faction = false;
        var sigil = false;
        var col = false;

        for (arg of args) {
            if (arg == 'gold') {
                gold = true;
            }
            if (arg == 'col') {
                col = true;
            }
            if (arg == 'faction') {
                faction = true;
            }
            if (arg == 'dt') {
                dt = true;
            }
            if (arg == 'sigil') {
                sigil = true;
            }
        }

        for (character of data.characters) {
            if (character.status == "Alive" && character.owner != '') {
                listOfCharacters += character.fullName 
                if (faction == true) listOfCharacters += ' of ' + character.faction 
                if (sigil == true) listOfCharacters += ' with the ' + character.sigil + ' sigil' 
                if (gold == true) listOfCharacters += ' has ' + character.gold + ' gold' 
                if (dt == true) listOfCharacters += ' has ' + character.downtime + ' downtime '
                if (col == true) listOfCharacters += ' is paying ' + character.costOfLiving + ' cost of living';
                listOfCharacters += '.\n'
                charCount++;
            }
            if (charCount == 25) {
                message.channel.send(listOfCharacters);
                listOfCharacters = '';
                charCount = 0;
            }
        }

        message.channel.send(listOfCharacters);
    }
}