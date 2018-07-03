var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', function (req, res) {
    console.log("request received");
    res.send('Hello World');
});

app.get('/candidates', function(req, res){
    console.log("Inside /candidates GET call");
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("candidates").find({}).toArray(function(err, result) {
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
                console.log("Length of array::" + result.length);
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
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
        var query = { cid: req.get("cid") }
        dbo.collection("candidates").find(query).toArray(function(err, result) {
            if (err){
                throw err;
            }

           else{
                console.log("Length of array::" + result.length);
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
