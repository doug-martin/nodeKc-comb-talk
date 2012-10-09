var comb = require("comb"),
    format = comb("%4j");
function hitch() {
    var scope = comb({test:"test"});
    var func = scope.hitch(function () {
        return this.test;
    });
    console.log(func()); //"test";
}

function hitchIngore() {
    var scope = comb({test:"test"});

    var func = scope.hitchIgnore(function () {
        return [this.test].concat(comb(arguments).toArray());
    });

    console.log(func("hello")); //["test"];
}

function bind() {
    var scope = comb({test:"test"});

    var func = scope.bind(function () {
        return this.test;
    });

    console.log(func()); //"test";
}

function bindIngore() {
    var scope = comb({test:"test"});

    var func = scope.bindIgnore(function () {
        return [this.test].concat(comb(arguments).toArray());
    });

    console.log(func("hello")); //["test"];
}

function merge() {
    var obj = comb({a:"b"});
    console.log(obj.merge({b:"c"})); //{a : "b", b : "c"}
    console.log(obj.merge({a:"d"})); //{a : "d", b : "c"}
}

function extend() {
    var obj = comb({a:"b"});
    console.log(obj.extend({b:"c"})); //{a : "b", b : "c"}
    console.log(obj.extend({a:"d"})); //{a : "d", b : "c"}
}


function deepMerge() {
    var obj = comb({test:true, a:{b:4}});

    format.format([obj.deepMerge({test2:false, a:{c:3}})]).print();


    format.format([obj.deepMerge({test3:"hello", test4:"world", a:{d:{e:2}}})]).print();


    format.format([obj.merge({a:{d:{f:{g:1}}}})]).print();
}

function forEach() {
    var obj = {a:"b", c:"d", e:"f"};
    comb(obj).forEach(function (value, key) {
        console.log(value, key);
    });
}

function filter() {
    var obj = {a:"b", c:"d", e:"f"};
    format.format([comb(obj).filter(function (value, key) {
        return value == "b" || key === "e";
    })]).print(); //{a : "b", e : "f"};
}

function invert() {
    var obj = {a:"b", c:"d", e:"f"};
    format.format([comb(obj).invert()]).print(); //{b : "a", d : "c", f : "e"}
}

function values() {
    var obj = {a:"b", c:"d", e:"f"};
    format.format([comb(obj).values()]).print();
    //["b", "d", "f"]
}

function toArray() {
    var obj = {a:"b", c:"d", e:"f"};
    comb(obj).toArray().print(); //[["a", "b"], ["c", "d"], ["e", "f"]]
}


var examples = module.exports = {
    hitch:hitch,
    hitchIgnore:hitchIngore,
    bind:bind,
    bindIngore:bindIngore,
    merge:merge,
    deepMerge:deepMerge,
    forEach:forEach,
    filter:filter,
    invert:invert,
    values:values,
    toArray:toArray
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


