module.exports = {
    name: 'spaces',
    description: 'Lists all spaces for this server.',
    execute(message, args) {
        const { url, name } = require('../database.json');
        const MongoClient = require('mongodb').MongoClient;
        //const client = new MongoClient(connection);

        /*MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(name);
            
        });*/
        
        // hard coding go brr
        message.channel.send('Lazurite');
    }
};