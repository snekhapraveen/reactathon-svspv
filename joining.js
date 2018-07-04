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
    dbo.collection("joining_details").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
       db.close();
    });
    dbo.createCollection("joining_details", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
       db.close();
    });
});


//insert few records into the collection
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj1 = {  jid: "b123", cid: "123", doj: "21/07/2018", venue: "RMZ location, Chennai", contact : { name: "Job Daniel", number: "8473298432"} };
    var myobj2 = {  jid: "c123", cid: "312", doj: "01/08/2018", venue: "OTP location, Chennai", contact : { name: "Kalashree", number: "5465478214"} };

    dbo.collection("joining_details").insertOne(myobj1, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("joining_details").insertOne(myobj2, function(err, res) {
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