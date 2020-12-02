// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')
const Discord = require('discord.js');

module.exports = {
    name: 'detail-lifestyles',
    description: 'Return a detailed description of the all lifestyles.',
    aliases: ['lifestyle'],
    usage: '',
    execute(message, args) {
        var lifestyleMessage = "Lifestyles:\n";
        try {
            const lifestyleEmbed = new Discord.MessageEmbed()
                .setTitle("Lifestyle Options")

            for (lifestyle of data.lifestyles) {
                lifestyleEmbed.addField(lifestyle.name, lifestyle.cost)
            }
            message.channel.send(lifestyleEmbed);
        }
        catch {
            for (lifestyle of data.lifestyles) {
                lifestyleMessage = lifestyleMessage + lifestyle.name + " (" + lifestyle.cost + ")\n";
            }
                message.channel.send(lifestyleMessage);
        }
    }
}