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

function readFileSync(file, encoding) {
    return fs.readFileSync(file, encoding || "utf8");
}

var file1 = resolve(__dirname, "./assets/myFile.txt"),
    file2 = resolve(__dirname, "./assets/myFile2.txt"),
    file3 = resolve(__dirname, "./assets/myFile3.txt");

comb.when(
    readFile(file1),
    readFileSync(file1),
    readFile(file2),
    readFileSync(file2),
    readFile(file3),
    readFileSync(file3)
).then(function (files) {
        files.forEach(function (data) {
            console.log(data);
        });
    }, errorHandler);
