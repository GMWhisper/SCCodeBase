// file system module to perform file operations
const fs = require('fs');
let data = require('../databases/data.json')

//TODO: Add sigil, add metadata for number of quests and last quest done
module.exports = {
    name: 'list-quest',
    description: 'View the quests in the database that can be discovered through exploration.',
    aliases: [],
    usage: '',
    execute(message, args) {
        var questList = '';

        if (!message.member.roles.cache.some(role => role.name === "@Dungeon Master")) {
            message.channel.send('You do not have permission to run this command.');
            return;
        }

        for (quest of data.quests) {
            if (isNaN(quest.id) == false) {
                questList += 'ID: ' + quest.id + ', DM: <@!' + quest.owner + '>, Title: ' + quest.name + '\n';
            }
        }

        message.channel.send(questList);
    }
}
