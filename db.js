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
    dbo.collection("candidates").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
    dbo.createCollection("candidates", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});


//insert few records into the collection
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { cid: "123", name: "Jaikrishnan", dob:"01/01/1992", jobs: [{ jid: "a123", jrole: "Developer", jdesc:"Develop reusable components", ivenue: "OTP", itime: "17/07/2018 9:30AM", status: "0", result: "0", feedback:"" },
            { jid: "b123", jrole: "Lead", jdesc:"Lead a team of minimum 20 people", ivenue: "OTP", itime: "01/07/2018 9:30AM", status: "1", result: "1", feedback:"Performance was good in technical round. Analytical skills were excellent. Candidate was found to be resourceful."  },
            { jid: "c123", jrole: "Manager", jdesc:"Manage a product development team", ivenue: "OTP", itime: "01/07/2018 9:30AM", status: "1", result: "0", feedback:""  }
        ] };
    var myobj2 = { cid: "231", name: "Jai", dob:"02/02/1991", jobs: [{ jid: "b123", jrole: "Lead", jdesc:"Lead a team of minimum 20 people", ivenue: "OTP", itime: "01/07/2018 9:30AM", status: "1", result: "2", feedback:"Candidate can improve his coding style and communication skills. But the willingness to learn was noticed. Keep trying and look forward for opportunities in future."  },
            { jid: "c123", jrole: "Manager", jdesc:"Manage a product development team", ivenue: "OTP", itime: "01/07/2018 9:30AM", status: "2", result: "0", feedback:""  }
        ]  };
    var myobj3 = { cid: "312", name: "Krishnan", dob:"02/04/1987", jobs: [{ jid: "d123", jrole: "Senior manager", jdesc:"Manage the operations and development of key projects", ivenue: "OTP", itime: "25/07/2018 9:30AM", status: "0", result: "0", feedback:""  },
            { jid: "c123", jrole: "Manager", jdesc:"Manage a product development team", ivenue: "OTP", itime: "01/07/2018 9:30AM", status: "1", result: "1", feedback:"Good job throughout!"  }
        ]  };
    dbo.collection("candidates").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("candidates").insertOne(myobj2, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
    dbo.collection("candidates").insertOne(myobj3, function(err, res) {
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