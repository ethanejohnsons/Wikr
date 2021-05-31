module.exports = {
    name: 'spaces',
    description: 'Lists all spaces for this server.',
    execute(message, args) {
        const mongo = require('../mongo.js');
        let results = await mongo.find({});
        
        // Send a message with the name of each space.
        results.forEach(function(result) {
            message.channel.send(result.title);
        });
    }
};