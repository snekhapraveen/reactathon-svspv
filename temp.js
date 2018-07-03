var exp = require("express");

var app = exp();

app.listen(2000, "127.0.0.1", function(){
    console.log("Server started");
});

var hello = function(){
    console.log("Hello world");
}

app.get("/", hello);