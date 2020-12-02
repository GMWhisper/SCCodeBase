// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

module.exports = {
    name: 'rez-character',
    description: 'Ressurect a dead character.',
    aliases: ['rez', 'ressurection'],
    usage: '[@player]',
    execute(message, args) {
        for (character of data.characters) {
            if (args[0].replace('<@!', '').replace('<@', '').replace('>', '') == character.owner) {
                if (character.status == 'Dead' && character.gold >= character.nextRez) {
                    character.gold = character.gold - character.nextRez;
                    character.status = 'Alive';
                    character.nextRez = character.nextRez * 2;
                    message.channel.send("You have been brought back from the dead!");
                }
                else if (character.status == 'Dead' && character.gold < character.nextRez) {
                    message.channel.send("You do not have enough gold to afford this service.");
                }
                else if (character.status != 'Dead') {
                    message.channel.send("You are not dead, you do not need this service right now.");
                }
            }
        }
    }
}