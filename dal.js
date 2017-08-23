const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/peopledb'
let people = []

function getAllDocs (err, db) {
  console.log(err)
  const collection = db.collection('people')
  let documents = []
  collection.find({}).toArray(function (err, docs) {
    people = docs
    db.close()
  })
}
function getAllPeople () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      console.log(db)
      const collection = db.collection('people')
      collection.find({}).toArray(function (err, docs) {
        console.log(docs)
        resolve(docs)
        reject(err)
      })
    })
  })
}
// Use connect method to connect to the server
function connectMongodb (url, cb) {
  MongoClient.connect(url, cb)
}

function getPeople () {
  connectMongodb(url, getAllDocs)
  return people
}

module.exports = { getPeople, getAllPeople }
