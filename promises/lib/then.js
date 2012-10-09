var comb = require("comb"),
    path = require("path"),
    resolve = path.resolve,
    fs = require("fs"),
    Promise = comb.Promise;


function readFile(file, encoding) {
    var ret = new Promise();
    fs.readFile(file, encoding || "utf8", ret.resolve.bind(ret));
    //return the promise object which removes the 'callback', 'errback' and 'resolve' functions.
    return ret.promise();
}


var readFilePromise = readFile(resolve(__dirname, "assets/myFile.txt"));
//with two callbacks
readFilePromise.then(
    function (file) {
        console.log("got file with content %s", file)
    },
    function (err) {
        console.log(err);
    }
);
//reusing the same promise Ignoring the error case
readFilePromise.then(function (file) {
    console.log(file);
});