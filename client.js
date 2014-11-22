"use strict";

var fs = require('fs');
var http = require('http');
var path = require('path');
var net = require('net');
var PORT = process.env.PORT || 4444;


var server = net.createServer(function(client) {

    var remoteAddress = client.remoteAddress;

    console.log(remoteAddress + ' connected');


}).listen(PORT);
console.log('server is now listening on port %s', PORT);
