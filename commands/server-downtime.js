// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')
const Discord = require('discord.js');

module.exports = {
    name: 'server-downtime',
    description: 'Returns the total downtime on the server.',
    aliases: [],
    usage: '',
    execute(message) {
        var totalDowntime = 0;
        for (character of data.characters) {
            if (character.status == 'Alive')
                totalDowntime = Number(totalDowntime) + Number(character.downtime);
        }
        message.channel.send("The total sum of downtime on the server is currently: " + totalDowntime);
    }
}
