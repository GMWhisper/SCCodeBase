// file system module to perform file operations
const fs = require('fs');
let data = require('../../databases/data.json')
const list = client.guilds.get("635180012718260280"); 

module.exports = {
    name: 'test',
    description: '.',
    usage: '',
    execute(message, args, client) {

// Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
list.members.forEach(member => console.log(member.user.username)); 

    }
}
