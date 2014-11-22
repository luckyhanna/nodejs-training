"use strict";

var fs = require('fs');
var http = require('http');
var path = require('path');


if (!process.env.LOC) {
    throw new Error('LOC environment variable missing!');
}


var PORT = process.env.PORT || 3333;
//var DIR = path.resolve(process.cwd(), process.env.LOC);
var DIR = path.resolve(process.cwd(), '/');

http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('Page Not Found');
    } else {
        fs.readdir(DIR, function(err, files){
            if (err) {
                res.writeHead(500, {'Content-Type' : 'text/html'});
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end(DIR + ': ' + files.join(', '));
            }
        })
    }
}).listen(PORT);
console.log('server is now listening on port %s', PORT);
