"use strict";

var http = require('http');

var options = {
    hostname: 'localhost',
    port: 3333,
    path: '/',
    method: 'GET' // POST
}

var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });

    res.on('end', function(){
        console.log('END....');
    });

    res.on('error', function(e){
        console.log('problem with request: ' + e);
    });
});



req.end();