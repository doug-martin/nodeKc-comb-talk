var comb = require("comb"),
    path = require("path"),
    resolve = path.resolve,
    fs = require("fs"),
    Promise = comb.Promise;

function errorHandler(err) {
    console.log(err.stack);
}


function readFile(file, encoding) {
    var ret = new Promise();
    fs.readFile(file, encoding || "utf8", ret.resolve.bind(ret));
    //return the promise object which removes the 'callback', 'errback' and 'resolve' functions.
    return ret.promise();
}
readFile(resolve(__dirname, "assets/myFile.txt")).then(function (text) {
    console.log(text);
}, errorHandler);