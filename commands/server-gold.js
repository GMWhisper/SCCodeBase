// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')
const Discord = require('discord.js');

module.exports = {
    name: 'server-gold',
    description: 'Returns the total gold on the server.',
    aliases: [],
    usage: '',
    execute(message) {
        var totalGold = 0;
        for (character of data.characters) {
            if (character.status == 'Alive')
                totalGold = Number(totalGold) + Number(character.gold);
        }
        message.channel.send("The total sum of gold on the server is currently: " + totalGold);
    }
}
