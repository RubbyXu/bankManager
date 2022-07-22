const { MongoClient } = require('mongodb');
 

let database = null;

async function startDatabase() {

  mongoDBURL = "mongodb://mongodb:27017"

  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});

  database = connection.db('bankManager');
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
    getDatabase
}