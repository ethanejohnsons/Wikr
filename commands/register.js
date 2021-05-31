module.exports = {
    name: 'register',
    usage: '<space id>',
    description: 'Register a space to this server.',
    execute(message, args) {
        const MongoClient = require('mongodb').MongoClient;
        const gitbook = require('./gitbook.js');
        const url = "mongodb://localhost:27017/";

        let serverID = message.server.id;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            let entry = {
                spaceID: args[0],
                serverID: serverID
            };

            let dbo = db.db("wikr");
            dbo.collection("spaces").insertOne(entry, function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });

        gitbook.fetch('user/spaces/')
            .then(res => res.json())
            .then(json => {
                message.channel.send(json);
            });
    }
};