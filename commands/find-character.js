// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'find-character',
    description: 'Find your active character.',
    aliases: ['active'],
    usage: '',
    execute(message, args) {

        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                for (player of data.players) {
                    if (player.activeCharacter = character.charSlot) {
                        message.channel.send(character.fullName + " is your active character.");
                    }
                }
            }
        }
    }
}