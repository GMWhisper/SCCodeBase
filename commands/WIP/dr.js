// file system module to perform file operations
const fs = require('fs');
let safety = require('../../recovery/safety.json')

module.exports = {
    name: '',
    description: '.',
    aliases: [],
    usage: '',
    execute(message, args) {
        var mLog = lots_of_messages_getter(message.channel, 100000);
    }
}


async function lots_of_messages_getter(channel, limit = 500) {
    const sum_messages = [];
    let last_id;

    while (true) {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        sum_messages.push(...messages.array());
        last_id = messages.last().id;

        if (messages.size != 100 || sum_messages >= limit) {
            break;
        }
    }

    for (var i = 0; i < sum_messages.length; i++) {
        console.log(sum_messages[i].content);
        if (sum_messages[i].content.match(/^!.*/)) {
            newRow = {
                date: sum_messages[i].createdTimestamp,
                content: sum_messages[i].content,
                owner: sum_messages[i].author.id
            }
            
            if (newRow.content.match(/^!withdraw.*/) || newRow.content.match(/^!deposit.*/)) {
                newRow.content.replace('!deposit-gold ', '!deposit-gold ' + newRow.owner);
                newRow.content.replace('!withdraw-gold ', '!deposit-gold ' + newRow.owner);
                newRow.content.replace('!deposit ', '!deposit ' + newRow.owner);
                newRow.content.replace('!withdraw ', '!deposit ' + newRow.owner);
            }

        safety.push(newRow);
        }
    }

    safety.sort(function(a, b){return a.date - b.date})

    fs.writeFile("recovery/safety.json", JSON.stringify(safety), err => {

        // Checking for errors 
        if (err) throw err;

        console.log("Done writing"); // Success );
    });
}
