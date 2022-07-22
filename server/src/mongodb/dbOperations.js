const { ObjectId } = require('mongodb') //注意大小写，这里是ObjectId不是ObjectID
const { getDatabase } = require('./mongoClient');

// const collectionName = 'collection1';

async function insertData(collectionName, data) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(data);
  console.log('insertedId', insertedId)
  return insertedId;
}

async function getDataById(collectionName, id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({
      _id:  ObjectId(id) 
  }).toArray();
}
async function queryData(collectionName, query){
    const database = await getDatabase();
    return  database.collection(collectionName).find(query).toArray();

}
async function deleteData(collectionName, id) {
    const database = await getDatabase();
      await database.collection(collectionName).deleteOne({
       _id:   ObjectId(id),
     });
  }

  async function updateData(collectionName, id, data) {

    console.log('before op db, id, ad', id, data);

    const database = await getDatabase();

    await database.collection(collectionName).updateOne(
      { _id:  ObjectId(id) },
      {
        $set: {
          ...data,
        },
      },
    );
  }

module.exports = {
  insertData,
  getDataById,
  deleteData,
  updateData,
  queryData
};

 