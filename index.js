const fs = require('fs');
const Discord = require('discord.js');
const { commandPrefix, searchPrefix } = require('./config/config.json');
const tokens = require('./config/tokens.json');
const gitbook = require('./gitbook.js');

// Initialize the client
const client = new Discord.Client();

// Gather up the commands
client.commands = new Discord.Collection();
for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Login to Discord
client.login(tokens.discord);

// On any message received
client.on('message', message => {
    if (message.author.bot) return;

    if (message.content.startsWith(commandPrefix) && !message.content.startsWith(searchPrefix)) {
        const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (client.commands.has(commandName)) {
            let command = client.commands.get(commandName);

            if (command.usage && !args.length) {
                return command.channel.send("Missing required args: " + command.usage);
            }

            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('There was a problem executing that command.');
            }
        }
    } else if (message.content.startsWith(searchPrefix)) {
        const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
        const word = args.shift().toLowerCase();

        try {
            gitbook.fetch('user/')
                .then(res => res.json())
                .then(json => console.log(json));
        } catch (error) {
            console.error(error);
        }
    }
});