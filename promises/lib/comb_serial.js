var comb = require("comb");


var asyncAction = comb(function (item, timeout) {
    var ret = new comb.Promise();
    //bind the callback to the promise ignoring any other arguments passed in
    setTimeout(ret.callback.bind(ret, item), timeout);
    return ret.promise();
});

comb.serial([
    asyncAction.partial(1, 1000),
    asyncAction.partial(2, 900),
    asyncAction.partial(3, 800),
    asyncAction.partial(4, 700),
    asyncAction.partial(5, 600),
    asyncAction.partial(6, 500)
]).then(function (results) {
        console.log(results); // [1,2,3,4,5,6];
    });