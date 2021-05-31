module.exports = {
    find(query) {
        const MongoClient = require('mongodb').MongoClient;
        const url = "mongodb://localhost:27017/";
        const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch(err => console.log(err));

        try {
            return new Promise(function(resolve, reject) {
                async.function(function(response) {
                    resolve(client.db("wikr").collection('spaces').findOne(query));
                });
            });
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },

    insert(document) {
        const MongoClient = require('mongodb').MongoClient;
        const url = "mongodb://localhost:27017/";
        const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch(err => console.log(err));

        try {
            return await client.db("wikr").collection('spaces').insertOne(document);
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }
}