var comb = require("comb");

function asyncAction(add, timeout) {
    //number gathered from the previous function
    return function _asyncAction(num) {
        //will be undefined if the first function in the list.
        num = num || 0;
        var ret = new comb.Promise();
        setTimeout(function () {
            ret.callback(num + add);
        }, timeout);
        return ret;
    }
}
comb.chain([
    asyncAction(1, 100),
    asyncAction(2, 100),
    asyncAction(3, 100),
    asyncAction(4, 100),
    asyncAction(5, 100)
]).then(function (results) {
        console.log(results); //15
    });