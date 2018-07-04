var express = require('express');
const fileUpload = require('express-fileupload');
var app = express();

var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', function (req, res) {
    console.log("request received");
    res.send('Hello!!');
});

app.get('/viewall', function(req, res){
    console.log(req.get("collection"));
    console.log("Inside /candidates GET call");
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(req.get("collection")).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

app.get('/applicants', function(req, res) {
    console.log("Inside /applicants GET call");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = {"jobs.jid" : req.get("jid")}
        dbo.collection("candidates").find(query).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log("Length of array:" + result.length);
                console.log('res: ', result);
                console.log('jid: ', req.get("jid"));
                res.setHeader("content-type", "application/json");
                res.send(result);
            }
            db.close();
        });
    });
});

app.get('/login', function(req, res){
    console.log(req.headers);
    if(req.get("cid") == null || req.get("dob")== null){
        return res.status(400).send('Insufficient headers.');
    }
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
        var query = { cid: req.get("cid") }
        dbo.collection("candidates").find(query).toArray(function(err, result) {
            if (err){
                throw err;
            }

           else{
                console.log("Length of array:" + result.length);
                console.log(result);
                res.setHeader("content-type", "application/json");
                res.send(result[0]);
            }
            db.close();
        });
    });
});

app.post('/feedback', function(req, res){
    var feedObj = { cid: req.body.cid, stars: req.body.stars, feedback: req.body.feedback };
    console.log(feedObj);
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");

        dbo.collection("feedback").insertOne(feedObj, function(err, res) {
            if (err) throw err;
            console.log("feedback document inserted");
        });
    });
});

app.post('/upload', function(req, res){
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    var file1 = req.files.file1;
    var file2 = req.files.file2;
    var file3 = req.files.file3;
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
    var doc = {cid: req.get("cid"), jid: req.get("jid"), file1: file1, file2: file2, file3: file3}
        dbo.collection("documents").insertOne(doc, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
        res.send('Files uploaded successfully!');
    });
});

app.get('/joiningDetails', function(req, res){
    console.log(req.headers);
    if(req.get("cid") == null || req.get("jid")== null){
        return res.status(400).send('Insufficient headers.');
    }
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
        var query = {$and:[{"cid":req.get("cid")},{"jid": req.get("jid")}]}
        dbo.collection("joining_details").find(query).toArray(function(err, result) {
            if (err){
                throw err;
            }

            else{
                console.log("Length of array:" + result.length);
                console.log(result);
                res.setHeader("content-type", "application/json");
                res.send(result[0]);
            }
            db.close();
        });
    });
});

var server = app.listen(4000, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
