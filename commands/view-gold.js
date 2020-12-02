// file system module to perform file operations
let data = require('../databases/data.json') 

module.exports = {
	name: 'view-gold',
    description: 'View how much gold a character in the database has.',
    aliases: ['vg', 'gold'],
    usage: '',
	execute(message, args) {
        for(character of data.characters) {
            if (message.author.id == character.owner) {
                console.log(character);
                message.channel.send(character.fullName + ' currently has ' + character.gold + ' gold.')
            }
        }
    }
}
