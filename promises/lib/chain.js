var comb = require("comb"),
    Promise = comb.Promise;

function asyncString(str) {
    var ret = new comb.Promise();
    process.nextTick(function () {
        ret.callback(str)
    });
    return ret.promise();
}

asyncString("hello")
    .chain(function (results) {
        return asyncString(results + " world");
    })
    .chain(function (results) {
        return asyncString(results + "!");
    })
    .then(function (str) {
        console.log(str); //"hello world!"
    });

asyncString("hello")
    .chain(function (results) {
        throw new Error("ERROR");
    })
    .chain(function (results) {
        return asyncString(results + "!");
    })
    .then(function (str) {
        console.log(str); //"hello world!"
    }, function (err) {
        console.log(err.stack);
    });

