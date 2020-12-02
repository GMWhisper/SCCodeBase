// file system module to perform file operations
let data = require('../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'archive-data',
    description: 'Creates a copy of the json database for disaster recovery.',
    aliases: ['archive'],
    usage: '',
    execute(message, args) {
            var d = new Date();

            fs.writeFile("databases/archive/data_" + d.getTime() + ".json", JSON.stringify(data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success );
            });     

            message.channel.send("Database successfully archived.");
    }
}
