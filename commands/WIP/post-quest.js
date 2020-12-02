// file system module to perform file operations
let data = require('../../databases/data.json')
const fs = require('fs');

module.exports = {
    name: 'post-quest',
    description: 'Posts a new quest to the proper text channel.',
    aliases: [],
    usage: '',
    execute(message, args) {
        var phase = 'title';
        var title = '';
        var time = ''
        var estTime = '';
        var diff = '';
        var dtCost = '';
        var playerList = '- ';
        var gamestyle = '';
        var desc = '';

        for (arg of args) {
            if(arg != '|') {
                switch (phase) {
                    case 'title':
                        title = title + arg + ' ';
                        break;
                    case 'time':
                        time = time + arg + ' ';
                        break;
                    case 'estTime':
                        estTime = estTime + arg + ' ';
                        break;
                    case 'diff':
                        diff = diff + arg + ' ';
                        break;
                    case 'dtCost':
                        dtCost = dtCost + arg + ' ';
                        break;
                    case 'playerList':
                        playerList = playerList + arg + ' ';
                        break;
                    case 'gamestyle':
                        gamestyle = gamestyle + arg + ' ';
                        break;
                    case 'desc':
                        desc = desc + arg + ' ';
                        break;
                }
            }

            else {
                switch (phase) {

                }
            }




            if (arg != '|' && phase == 'time') {
                continue;
            }

            if (arg == '|' && phase == 'time') {
                phase = 'title';
                title.substring(0, title.length - 1);
                continue;
            }

            if (arg != '|' && phase == 'title') {
                title = title + arg + ' ';
                continue;
            }

            if (arg == '|' && phase == 'title') {
                phase = 'desc';
                title.substring(0, title.length - 1);
                continue;
            }

            if (arg != '|' && phase == 'desc') {
                desc = desc + arg + ' ';
                continue;
            }

            if (arg == '|' && phase == 'desc') {
                phase = 'players';
                desc.substring(0, title.length - 1);
                continue;
            }

            if (arg != '|' && phase == 'players') {
                playerList = playerList + arg + '\n- ';
                continue;
            }

            if (arg == '|' && phase == 'players') {
                phase = 'end';
                desc.substring(0, title.length - 3);
                break;
            }
        }

        if (phase != 'end') {
            message.channel.send('Arguments used were insufficient, please try again.');
        }

        message.channel.send(title + 
            '\nDate/Time (CST): ' + time + 
            '\nEstimated Length: ' + estTime + 
            '\nDifficulty: ' + diff + 
            '\nDowntime Cost: ' + dtCost + 
            '\nParty: @Adventurer\n' + playerList +
            '\nGamestyle(s): ' + gamestyle +
            '\nQuest Description: ' + desc +
            '\n\nDM: ' + message.author)
    }
}