
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
let db;
var mongo = MongoClient.connect(url, function(err, database) {
    console.log("Connected successfully to server");
    db = database.db('listAppDatabase');
    db.listCollections().toArray(function(err, collInfos) {
        console.log(collInfos)
    });

    db.collection('listItem').find({}).toArray(function(err, res) {
        console.log(res)
    });
});
var putItem = (itemToPut)=>{
    insertFormData(itemToPut);
    printCollection();
};
var dropItem = (itemToDelete)=>{
    db.collection('listItem').deleteOne( { item: itemToDelete } )
};

var findItem = (itemToFind)=>{
    return db.collection('listItem').find({"item":itemToFind}).toArray().then(res => {
        //console.log(res);
        return res;
    })
};
var find = (itemToFind)=>{
    return db.collection('listItem').find(itemToFind).toArray().then(res => {
        console.log(res);
        return res;
    })
};

var printCollection=()=>{
    find();
}
const insertFormData =( item ) => {
    db.collection('listItem').insertOne( {
        "item": item
    })
};

module.exports = {dropItem, putItem, findItem, find};

