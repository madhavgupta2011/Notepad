const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

const mongoConnect = ((callback) => {
    mongoClient.connect('mongodb+srv://madhavgupta2011:w3mDYjiyJh45vaYm@notepadcluster-pr1q1.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
        .then(client => {
            callback(client);
        })
        .catch(err => {
            console.log(err);
        })
})





module.exports.mongoConnect = mongoConnect;