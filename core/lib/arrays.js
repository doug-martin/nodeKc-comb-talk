var comb = require("comb");
function style() {
//prints red green and blue in red to the terminal
    console.log(comb(["red", "green", "blue"]).style("red").join("\n"));
}

function forEach() {
    comb([1, 2, 3])
        .forEach(function (num) {
            console.log(num);
        })
        .map(function (num) {
            return num * 2;
        })
        .forEach(function (num) {
            console.log(num);
        });
}

function zip() {
    comb([1]).zip([2], [3]).print();    // [[ 1, 2, 3 ]]
    comb([1, 2]).zip([2], [3]).print(); // [[ 1, 2, 3 ], [2, null, null]]
    comb([1, 2, 3]).zip([4,5,6], [7,8,9]).print();  //[[1, 4, 7],[2, 5, 8],[3, 6, 9]]
}

function sum() {
    comb([1, 2, 3]).sum().print(); //6
}

function avg() {
    comb([1, 2, 3]).avg().print(); //2
}


function sort() {
    var arr = [3, 2, 1];
    comb(arr).sort().print();

    var arr2 = [
        {a:3},
        {a:2},
        {a:1}
    ];
    comb(arr2).sort("a").pluck("a").print(); //[1,2,3]
    comb(arr2).pluck("a").print();           //[3,2,1]
}

function min() {
    var arr = [3, 2, 1];
    comb(arr).min().print(); //1


    var arr2 = [
        {a:3},
        {a:2},
        {a:1}
    ];
    comb(arr2).min("a").print(); //{a : 1}
}


function max() {
    var arr = [3, 2, 1];

    comb(arr).max().print(); //3

    var arr2 = [
        {a:3},
        {a:2},
        {a:1}
    ];
    comb(arr2).max("a").print(); //{a : 3}
}

function difference() {
    comb([true, false]).difference([false]).print(); //[true]
    comb([1, 2, 3]).difference([2]).print();        //[1, 3]
    comb([1, 2, 3]).difference([2], [3]).print();   //[1]
    comb(["a", "b", 3]).difference([3]).print();    //["a", "b"]
    comb(["a", "b", "c"]).difference(["b", "c"]).print();     //[a]
}

function removeDuplicates() {
    comb([1, 2, 2, 3, 3, 3, 4, 4, 4]).removeDuplicates().print(); //[1, 2, 3, 4]
    comb(["a", "b", "b"]).removeDuplicates().print();             // ["a", "b"]
}

function unique() {
    comb([1, 2, 2, 3, 3, 3, 4, 4, 4]).unique().print(); // [1, 2, 3, 4]);
    comb(["a", "b", "b"]).unique().print();            // ["a", "b"]);
}

function rotate() {
    var arr = comb(["a", "b", "c", "d"]);
    arr.rotate().print();   // ["b", "c", "d", "a"]);
    arr.rotate(2).print();  // ["c", "d", "a", "b"]);
    arr.rotate(3).print();  // ["d", "a", "b", "c"]);
    arr.rotate(4).print();  // ["a", "b", "c", "d"]);
    arr.rotate(-1).print(); // ["d", "a", "b", "c"]);
    arr.rotate(-2).print(); // ["c", "d", "a", "b"]);
    arr.rotate(-3).print(); // ["b", "c", "d", "a"]);
    arr.rotate(-4).print(); // ["a", "b", "c", "d"]);
}


function permutations() {
    var arr = comb([1, 2, 3]);
    arr.permutations().print();  //[
//  [ 1, 2, 3 ],
//  [ 1, 3, 2 ],
//  [ 2, 3, 1 ],
//  [ 2, 1, 3 ],
//  [ 3, 1, 2 ],
//  [ 3, 2, 1 ]
// ]

    arr.permutations(2).print(); //[
//  [ 1, 2],
//  [ 1, 3],
//  [ 2, 3],
//  [ 2, 1],
//  [ 3, 1],
//  [ 3, 2]
//]

    arr.permutations(1).print(); //[
//  [1],
//  [2],
//  [3]
//]
}

function transpose() {
    comb([
        [1, 2, 3],
        [4, 5, 6]
    ]).transpose().print(); //[
// [ 1, 4 ],
// [ 2, 5 ],
// [ 3, 6 ]
//]
}

function valuesAt() {
    var arr = comb(["a", "b", "c", "d"]).print();
    arr.valuesAt(1, 2, 3).print();    //["b", "c", "d"]);
    arr.valuesAt(1, 2, 3, 4).print(); //["b", "c", "d", null]);
    arr.valuesAt(0, 3).print();       //["a", "d"]);
}


function union() {
    comb(["a", "b", "c"]).union(["b", "c", "d"]).print();  //["a", "b", "c", "d"]);
    comb(["a"]).union(["b"], ["c"], ["d"], ["c"]).print(); //["a", "b", "c", "d"]);
}

function intersect() {
    comb([1, 2]).intersect([2, 3], [2, 3, 5]).print();                   //[2]
    comb([1, 2, 3]).intersect([2, 3, 4, 5], [2, 3, 5]).print();          //[2, 3]
    comb([1, 2, 3, 4]).intersect([2, 3, 4, 5], [2, 3, 4, 5]).print();    //[2, 3, 4]
    comb([1, 2, 3, 4, 5]).intersect([1, 2, 3, 4, 5], [1, 2, 3]).print(); //[1, 2, 3]
}

function powerSet() {
    comb([1, 2]).powerSet().print();
//[
//  [],
//  [ 1 ],
//  [ 2 ],
//  [ 1, 2 ]
//]
}


function cartesian() {
    comb([1, 2]).cartesian([2, 3]).print(); //[
// [1, 2],
// [1, 3],
// [2, 2],
// [2, 3]
//]
}

function compact() {
    comb([1, null, undefined, 2]).compact().print(); //[1, 2]
}

function multiply() {
    comb([1, 2, 3]).multiply(2).print(); //[1, 2, 3, 1, 2, 3]
}


function flatten() {
    comb([1, 2]).flatten([2, 3], [3, 4]).print();     //[1, 2, 2, 3, 3, 4]
    comb([
        [1],
        [2],
        [3]
    ]).flatten().print();          //[1, 2, 3]
    comb([
        [1, 2],
        2
    ]).flatten([2, 3], [3, 4]).print(); //[[1, 2],2,2,3,3,4]
}

function pluck() {
    var arr = comb([
        {name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},
        {name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},
        {name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},
        {name:{first:"Johnny", last:"P."}, age:56, roles:[]}
    ]);


    arr.pluck("name.first").print(); //["Fred", "Bob", "Alice", "Johnny"]
    arr.pluck("age").print(); //[50, 40, 35, 56]
    arr.pluck("roles.length").print(); //[3, 2, 1, 0]
    arr.pluck("roles.0").print(); //["a", "b", "c", undefined]

}

function invoke() {
    function person(name, age) {
        return {
            getName:function () {
                return name;
            },
            setName:function (newName) {
                name = newName;
            },

            getOlder:function () {
                age++;
                return this;
            },

            getAge:function () {
                return age;
            }
        };
    }

    var arr = comb([person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)]);

    arr.invoke("getName").print(); //["Bob", "Alice", "Fred", "Johnny"]
    arr.invoke("getOlder").invoke("getAge").print(); //[41, 36, 51, 57];
}

var examples = module.exports = {
    invoke:invoke,
    pluck:pluck,
    flatten:flatten,
    multiply:multiply,
    compact:compact,
    cartesian:cartesian,
    powerSet:powerSet,
    intersect:intersect,
    valuesAt:valuesAt,
    transpose:transpose,
    permutations:permutations,
    rotate:rotate,
    union:union,
    unique:unique,
    removeDuplicates:removeDuplicates,
    difference:difference,
    max:max,
    min:min,
    pluck:pluck,
    sort:sort,
    avg:avg,
    sum:sum,
    zip:zip,
    forEach:forEach,
    style:style
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
