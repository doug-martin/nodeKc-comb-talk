var comb = require("comb"),
    path = require("path"),
    resolve = path.resolve,
    fs = require("fs"),
    Promise = comb.Promise,
    file1 = resolve(__dirname, "./assets/myFile.txt"),
    file2 = resolve(__dirname, "./assets/myFile2.txt"),
    file3 = resolve(__dirname, "./assets/myFile3.txt");

function errorHandler(err) {
    console.log(err.stack);
}

function readFile(file, encoding) {
    var ret = new Promise();
    fs.readFile(file, encoding || "utf8", ret.resolve.bind(ret));
    //return the promise object which removes the 'callback', 'errback' and 'resolve' functions.
    return ret.promise();
}

function readFiles() {
    return comb.when(comb(arguments).toArray().map(function (file) {
        return readFile(file);
    }));
}


readFiles(file1, file2, file3).then(function (files) {
    files.forEach(function (data) {
        console.log(data);
    });
}, errorHandler);
