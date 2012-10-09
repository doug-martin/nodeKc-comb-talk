var comb = require("comb");

function hitch() {
    var add = comb(function (arg1, arg2) {
        return arg1 + arg2 * this.multiplier;
    }).hitch({multiplier:2}, 2);

    console.log(add(10)); //24
    console.log(add(11)); //26
    console.log(add(12)); //28
}


function bind() {
    var add = comb(function (arg1, arg2) {
        return arg1 + arg2 * this.multiplier;
    }).bind({multiplier:2}, 2);

    console.log(add(10)); //24
    console.log(add(11)); //26
    console.log(add(12)); //28
}

function hitchIgnore() {
    var add = comb(function (arg1, arg2) {
        //arg two will always be undefined.
        return (arg1 + (arg2 || 0)) * this.multiplier;
    }).hitchIgnore({multiplier:2}, 2);

    console.log(add(10)); //4
    console.log(add(11)); //4
    console.log(add(12)); //4
}


function bindIngore() {
    var add = comb(function (arg1, arg2) {
        //arg two will always be undefined.
        return (arg1 + (arg2 || 0)) * this.multiplier;
    }).bindIgnore({multiplier:2}, 2);

    console.log(add(10)); //4
    console.log(add(11)); //4
    console.log(add(12)); //4
}


function partial() {
    var arr = [];
    Object.defineProperty(arr, "pushTwo", {
        value:comb(function (arg1) {
            this.push(comb(arguments).toArray());
        }).partial(2),
        enumerable:false
    });
    arr.pushTwo(1);
    arr.pushTwo(3);
    console.log(arr); //[[2,1], [2,3]]
}


function applyFirst() {
    var arr = [];

    var pushTwo = comb(function (val) {
        this.push(comb(arguments).toArray());
    }).applyFirst(2);

    pushTwo(arr, 1);
    pushTwo(arr, 2);
    pushTwo(arr, 3);
    console.log(arr); //[ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
}


function bindFirst() {
    var arr = [];

    var pushTwo = comb(function (val) {
        this.push(comb(arguments).toArray());
    }).bindFirst(2);

    pushTwo(arr, 1);
    pushTwo(arr, 2);
    pushTwo(arr, 3);
    console.log(arr); //[ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
}


function curry() {
    var func = comb(function (a, b, c, d) {
        return [this.test, a, b, c, d];
    });
    var curried = func.curry(4, {test:true});
    console.log(curried("a")("b")("c")("d"));
}

function extend() {
    var MyObj2 = comb(function (str) {
        this.str = str || "hello";
    });

    MyObj2.extend({
        getStr:function () {
            return this.str;
        }
    });

    var m2 = new MyObj2();
    console.log(m2.getStr()); //"hello"
    m2.str = "world";
    console.log(m2.getStr()); //"world"
}

var examples = module.exports =  {
    hitch:hitch,
    bind:bind,
    hitchIgnore:hitchIgnore,
    bindIngore:bindIngore,
    partial:partial,
    applyFirst:applyFirst,
    bindFirst:bindFirst,
    curry:curry,
    extend:extend
};

var example = process.argv[2];

if (example) {
    examples[example]();
} else {
    Object.keys(examples).forEach(function (key) {
        var val = examples[key];
        console.log("Running %s", key);
        val();
        console.log("\n");
    });
}

