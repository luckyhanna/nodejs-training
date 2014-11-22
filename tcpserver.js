"use strict";

var net = require('net');
var PORT = process.env.PORT || 3333;
var fs = require('fs'); // file system
//var split = require('split');
var _dirname = "D:/node/";

var server = net.createServer(function(client){

    var remoteAddress = client.remoteAddress;
    console.log(remoteAddress + ' connected');

    fs.createReadStream(_dirname + '/fake.txt').pipe(client);

   /* fs.createReadStream(__dirname + '/fake.txt').pipe(split()).on('data', function(data) {
        client.write('');
    });*/


}).listen(PORT);
console.log('server is now listening on port %s', PORT);
