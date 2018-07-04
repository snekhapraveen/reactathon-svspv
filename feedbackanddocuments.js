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
    dbo.createCollection("feedback", function(err, res) {
        if (err) throw err;
        console.log("Feedbacks Collection created!");
        db.close();
    });
});


MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("documents", function(err, res) {
        if (err) throw err;
        console.log("Documents Collection created!");
        db.close();
    });
});
