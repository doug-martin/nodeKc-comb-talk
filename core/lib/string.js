var comb = require("comb");

function style() {
    //prints a red string
    comb("string").style("red").print();
    //prints a bold green string
    comb("string").style(["green", "bold"]).print();
}

function multiply() {
    comb("HELLO ").multiply(5).print();
}

function toArray() {
    comb("a|b|c|d").toArray("|").print(); //["a","b","c","d"]
    comb("a").toArray("|").print();       //["a"]
    comb("").toArray("|").print();        //[]
}


function format() {
    comb("%s, %s").format(["Hello", "World"]).print(); //"Hello, World"
    comb("%[ 10]s, %[- 10]s").format(["Hello", "World"]).print(); //"     Hello, World     ";
    comb("%-!10s, %#10s, %10s and %-10s").format("apple", "orange", "bananas", "watermelons").print();
    //"apple!!!!!, ####orange,    bananas and watermelon"
    comb("%+d, %+d, %10d, %-10d, %-+#10d, %10d").format(1, -2, 1, 2, 3, 100000000000).print();
    //"+1, -2, 0000000001, 2000000000, +3########, 1000000000"
    var date = new Date();
    comb("%[h:mm a]D").format([date]).print();
    //7:32 PM - local -
    comb("%[h:mm a]Z").format([date]).print();
    //12:32 PM - UTC

    //When using object formats they must be in an array otherwise
    //format will try to interpolate the properties into the string.
    comb("%j").format([
        {a:"b"}
    ]).print(); //'{"a":"b"}'
    comb("%1j, %4j").format([
        {a:"b"},
        {a:"b"}
    ]).print(); //'{\n "a": "b"\n},\n{\n    "a": "b"\n}'
    comb("{hello}, {world}").format({hello:"Hello", world:"World"}).print(); //"Hello, World";
    comb("{[-s10]apple}, {[%#10]orange}, {[10]banana} and {[-10]watermelons}").format({
        apple:"apple",
        orange:"orange",
        banana:"bananas",
        watermelons:"watermelons"
    }).print(); //applesssss, ####orange,    bananas and watermelon

}

function truncate() {
    //from the beginning
    comb("abcdefg").truncate(3).print();      //"abc";
    //from the end
    comb("abcdefg").truncate(3, true).print(); // "efg"
    //omit the length
    comb("abcdefg").truncate().print();       //"abcdefg"

}

function pad() {
    var str = comb("STR");
    str.pad(5).print(); //"  STR"
    str.pad(5, " ", true).print(); //"STR  "
    str.pad(5, "$", true).print(); //"$$STR"
}

function camelize() {
    comb('hello_world').camelize().print(); // "helloWorld"
    comb('column_name').camelize().print(); // "columnName"
    comb('columnName').camelize().print();  // "columnName"
}


function underscore() {
    comb('helloWorld').underscore().print(); // "hello_world"
    comb('column_name').underscore().print(); // "column_name"
    comb('columnName').underscore().print();  // "column_name"
}

function classify() {
    comb('egg_and_hams').classify().print(); //"eggAndHam"
    comb('post').classify().print();         //"post"
    comb('schema.post').classify().print();  //"post"
}

function pluralize() {
    comb("post").pluralize().print();               //"posts"
    comb("octopus").pluralize().print();          //"octopi"
    comb("sheep").pluralize().print();            //"sheep"
    comb("word").pluralize().print();                //"words"
    comb("the blue mailman").pluralize().print(); //"the blue mailmen"
    comb("CamelOctopus").pluralize().print();     //"CamelOctopi"
}

function singularize() {
    comb("posts").singularize().print();               //"post"
    comb("octopi").singularize().print();           //"octopus"
    comb("sheep").singularize().print();            //"sheep"
    comb("words").singularize().print();            //"word"
    comb("the blue mailmen").singularize().print(); //"the blue mailman"
    comb("CamelOctopi").singularize().print();      //"CamelOctopus"
}


function applyFirst() {
    var arr = [], push = comb("push").applyFirst(), length = comb("length").applyFirst();
    push(arr, 1, 2, 3, 4);
    length(arr); //4
    console.log(arr); //1,2,3,4
}

function bindFirst() {
    var arr = [], push = comb("push").bindFirst(), length = comb("length").bindFirst();
    push(arr, 1, 2, 3, 4);
    length(arr); //4
    console.log(arr); //1,2,3,4
}

function partial() {
    var func = comb("test2").partial("hello");
    var scope = {
        test2:function (arg) {
            return true;
        }
    };
    console.log(func.call(scope)); //true
}


function parseDate() {
    comb("08/11/06").parseDate("MM/dd/yy").print();                        //aug_11_2006
    comb("11Aug2006").parseDate('ddMMMyyyy').print();                            //aug_11_2006
    comb("Aug2006").parseDate('MMMyyyy').print();                                //new Date(2006, 7, 1)
    comb("Aug 11, 2006").parseDate("MMM dd, yyyy").print();              //aug_11_2006
    comb("August 11, 2006").parseDate("MMMM dd, yyyy").print();          //aug_11_2006
    comb("Friday, August 11, 2006").parseDate("EEEE, MMMM dd, yyyy").print(); //aug_11_2006
}

function escape() {
    comb(".$?*|{}()[]\/+^").escape().print();
}

function pluck() {

    var arr = [
        {name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},
        {name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},
        {name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},
        {name:{first:"Johnny", last:"P."}, age:56, roles:[]}
    ];
    comb("name.first").pluck(arr).print(); //["Fred", "Bob", "Alice", "Johnny"]
    comb("age").pluck(arr).print(); //[50, 40, 35, 56]
    comb("roles.length").pluck(arr).print(); //[3, 2, 1, 0]
    comb("roles.0").pluck(arr).print(); //["a", "b", "c", undefined]
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

    var arr = [person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)];
    comb("getName").invoke(arr).print(); //["Bob", "Alice", "Fred", "Johnny"]
    comb("getOlder").invoke(arr).invoke("getAge").print(); //[41, 36, 51, 57];
}

function hitch() {
    var obj = {
        str:"hello",
        test:function () {
            return this.str;
        },
        curried:function () {
            return [this.str].concat(comb(arguments).toArray());
        }
    };
    var test = comb("test").hitch(obj);
    var curried = comb("curried").hitch(obj, "world");
    console.log(test()); // "hello"
    console.log(curried("!")); //["hello", "world", "!"]
}

function bind() {
    var obj = {
        str:"hello",
        test:function () {
            return this.str;
        },
        curried:function () {
            return [this.str].concat(comb(arguments).toArray());
        }
    };
    var test = comb("test").bind(obj);
    var curried = comb("curried").bind(obj, "world");
    console.log(test()); // "hello"
    console.log(curried("!")); //["hello", "world", "!"]
}


function hitchIgnore() {
    var obj = {
        str:"hello",
        curried:function () {
            return [this.str].concat(comb(arguments).toArray());
        }
    };
    var curried = comb("curried").hitchIgnore(obj, "world");
    console.log(curried("!")); //["hello", "world"]
}

function bindIgnore() {
    var obj = {
        str:"hello",
        curried:function () {
            return [this.str].concat(comb(arguments).toArray());
        }
    };
    var curried = comb("curried").bindIgnore(obj, "world");
    console.log(curried("!")); //["hello", "world"]
}


function curried() {
    var scope = {
        test:true,
        curried:function (a, b, c, d) {
            return [this.test, a, b, c, d];
        }
    };
    var curriedFunc = comb("curried").curry(4, scope);
    console.log(curriedFunc("a")("b")("c")("d")); //[true, "a", "b", "c", "d"]
}

var examples = module.exports = {
    curried:curried,
    bindIgnore:bindIgnore,
    hitchIgnore:hitchIgnore,
    bind:bind,
    hitch:hitch,
    invoke:invoke,
    pluck:pluck,
    escape:escape,
    parseDate:parseDate,
    partial:partial,
    bindFirst:bindFirst,
    applyFirst:applyFirst,
    singularize:singularize,
    pluralize:pluralize,
    classify:classify,
    underscore:underscore,
    camelize:camelize,
    truncate:truncate,
    pad:pad,
    format:format,
    toArray:toArray,
    multiply:multiply,
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
