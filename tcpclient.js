"use strict";

var net = require('net');
var PORT = process.env.PORT || 3333;
var fs = require('fs'); // file system
var split = require('split');


var client = net.connect({port:PORT}, function(){
    console.log('connected');
    client.write('world!');
    
    client.pipe(split()).on('data', function(data){
        console.log('NEW LINE --> ', data);
        console.log('************');
    })
    
});

client.on('end', function(){
    console.log('disconnected.');
});