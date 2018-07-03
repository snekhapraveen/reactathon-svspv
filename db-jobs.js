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
    dbo.createCollection("jobs", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});


//insert few records into the collection
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { jid: "a123", jrole: "Developer", jdesc:"Develop reusable components" };
    var myobj2 = { jid: "b123", jrole: "Lead", jdesc:"Lead a team of minimum 20 people" };
    var myobj3 = { jid: "c123", jrole: "Manager", jdesc:"Manage a product development team" };
    dbo.collection("jobs").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("jobs").insertOne(myobj2, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("jobs").insertOne(myobj3, function(err, res) {
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
    dbo.collection("candidates").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});
*/