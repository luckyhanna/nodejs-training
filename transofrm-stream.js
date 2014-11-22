// transform streams - implementeaza atat interfata readable, cat si writable
// ex: split stream - primeste date dintr-un fisier si trimite mai departe partile relevante (linie cu linie)

// combining streams with .pipe()
// upload de vide, la sfarsit se face encoding. in loc sa facem upload si la sfrsit sa asteptam encodarea, encodarea se face bucata cu bucata


// http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html
"use strict";

var crypto = require('crypto');
var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

function ShaSum(options) {
    // allow use without new
    if (!(this instanceof ShaSum)) {
        return new ShaSum(options);
    }

    // init Transform
    Transform.call(this, options);

    this.digester = crypto.createHash('sha1');
}

util.inherits(ShaSum, Transform);

/* during each chunk, update the digest */
ShaSum.prototype._transform = function (chunk, enc, cb) {
    // if is Buffer use it, otherwise coerce
    var buffer = (Buffer.isBuffer(chunk)) ?
        chunk :
        new Buffer(chunk, enc);
    this.digester.update(buffer); // update hash

    // we are not writing anything out at this
    // time, only at end during _flush
    // so we don't need to call push
    cb();
};

/* at the end, output the hex digest */
ShaSum.prototype._flush = function (cb) {
    this.push(this.digester.digest('hex'));
    cb();
};


// try it out
var shasum = new ShaSum();
shasum.pipe(process.stdout); // output to stdout
shasum.write('hello world\n'); // input line 1
shasum.write('another line');  // input line 2
shasum.end();  // finish