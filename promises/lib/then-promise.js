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

var readAndConvertToUppercase = function (file, encoding) {
    var ret = new comb.Promise();
    readFile(file, encoding).then(
        function (data) {
            ret.callback(data.toUpperCase());
        },
        //pass in the return promise as the second argument.
        //this is the same as setting the errback to ret.errback.bind(ret);
        ret
    );
    return ret.promise();
};

//with two callbacks
readAndConvertToUppercase(resolve(__dirname, "assets/myFile.txt")).then(
    function (file) {
        console.log(file);
    },
    function (err) {
        console.log(err);
    }
);