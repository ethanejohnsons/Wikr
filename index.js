const fs = require('fs');
const assert = require('assert');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const { api, commandPrefix, searchPrefix } = require('./config/config.json');
const tokens = require('./config/tokens.json');

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
        const command = args.shift().toLowerCase();

        if (client.commands.has(command)) {
            try {
                client.commands.get(command).execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('There was a problem executing that command.');
            }
        }
    } else if (message.content.startsWith(searchPrefix)) {
        const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
        const word = args.shift().toLowerCase();

        try {
            var endpoint = api + 'spaces/-MM4d7zIxwc3cvyIMnBY/content';
            var bearer = 'Bearer ' + tokens.gitbook;

            fetch(endpoint, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => console.log(json));
        } catch (error) {
            console.error(error);
        }
    }
});