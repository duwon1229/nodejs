const express = require("express");
const app = express();
const fs = require("fs");
var bodyParser = require("body-parser");
var compression = require("compression");
var topciRouter = require("./routes/topic");
var indexRouter = require("./routes/index");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
// get 방식만 적용
app.get("/{*any}", function (request, response, next) {
  console.log("first middleware");
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topciRouter);

app.use(function (request, response, next) {
  response.status(404).send("Sorry can't find that!");
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
      } else {
      }
    } else if(pathname === '/create'){

    } else if(pathname === '/create_process'){
      
    } else if(pathname === '/update'){
      
    } else if(pathname === '/update_process'){
      
    } else if(pathname === '/delete_process'){
      
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/
