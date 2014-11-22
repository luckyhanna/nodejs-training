"use strict";

var request = require('request');
var cheerio = require('cheerio');

request('https://news.ycombinator.com/', function (err, res, body) {
    if (err) {
        throw err;
    }

    var $ = cheerio.load(body);
    /*console.log($('.title a').map(function(i, el) {
        var $el = $(this);

        return {
            'text': $el.text(),
            'href': $el.attr('href')
        }
    }));*/
//    console.log(body);

    var results = [];
    $('.title a').each(function(i, el) {
        var $el = $(this);

        results.push({
            'text': $el.text(),
            'href': $el.attr('href')
        });
    });

    console.log(results);

});


