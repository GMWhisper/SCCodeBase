// file system module to perform file operations
const fs = require('fs');
let safety = require('../recovery/safety.json')

module.exports = {
    name: '',
    description: 'Commit a character to one of the three factions.',
    aliases: [],
    usage: '[@player] [Faction name]',
    execute(message, args) {
        for (m of safety) {
            message.channel.send(m.content);
        }

    }
}
