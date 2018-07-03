var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


// create a data base
/*
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
*/

//create a collection

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("candidates_job", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});


//insert few records into the collection
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj1 = { cid:"123", jid: "a123" };
    var myobj2 = { cid:"231", jid: "a123" };
    var myobj3 = { cid:"231", jid: "b123" };
    var myobj4 = { cid:"231", jid: "c123" };

    dbo.collection("candidates_job").insertOne(myobj1, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("candidates_job").insertOne(myobj2, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("candidates_job").insertOne(myobj3, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("candidates_job").insertOne(myobj4, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    db.close();
});


/*
// delete the entire collection
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("candidates_job").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});
*/