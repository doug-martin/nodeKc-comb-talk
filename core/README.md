#comb()

##Strings

`curried`

Currys a function with the specified name.

`node ./lib/string.js curried`

```javascript
  var scope = {
        test:true,
        curried:function (a, b, c, d) {
            return [this.test, a, b, c, d];
        }
    };
    var curriedFunc = comb("curried").curry(4, scope);
    console.log(curriedFunc("a")("b")("c")("d")); //[true, "a", "b", "c", "d"]
```

`bindIgnore`

Binds a function with the specified name ignoring all arguments.

`node ./lib/string.js bindIgnore`

```javascript
 var obj = {
        str:"hello",
        curried:function () {
            return [this.str].concat(comb(arguments).toArray());
        }
    };
    var curried = comb("curried").bindIgnore(obj, "world");
    console.log(curried("!")); //["hello", "world"]
```

`hitchIgnore`

Same as `bindIgnore`

`node ./lib/string.js hitchIngore`

```javascript
 var obj = {
        str:"hello",
        curried:function () {
            return [this.str].concat(comb(arguments).toArray());
        }
    };
    var curried = comb("curried").hitchIgnore(obj, "world");
    console.log(curried("!")); //["hello", "world"]
```

`bind`

Binds a function to the specified scope currying all arguments.

`node ./lib/string.js bind`

```javascript
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
```

`hitch`

Same as `bind`

`node ./lib/string.js hitch`

```javascript
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
```

`invoke`

Invokes the named function on each argument in an array

`node ./lib/string.js invoke`

```javascript
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
```

`pluck`

Plucks the named property from each item in an array

`node ./lib/string.js pluck`

```javascript

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
```

`escape`

Escapes a string

`node ./lib/string.js escape`

```javascript
comb(".$?*|{}()[]\/+^").escape().print();
```

`parseDate`

Parses a date string.

`node ./lib/string.js parseDate`

```javascript
    comb("08/11/06").parseDate("MM/dd/yy").print();                        //aug_11_2006
    comb("11Aug2006").parseDate('ddMMMyyyy').print();                            //aug_11_2006
    comb("Aug2006").parseDate('MMMyyyy').print();                                //new Date(2006, 7, 1)
    comb("Aug 11, 2006").parseDate("MMM dd, yyyy").print();              //aug_11_2006
    comb("August 11, 2006").parseDate("MMMM dd, yyyy").print();          //aug_11_2006
    comb("Friday, August 11, 2006").parseDate("EEEE, MMMM dd, yyyy").print(); //aug_11_2006
```


`partial`

Excutes the name method not alerting scope but currying arguments.

`node ./lib/string.js partial`

```javascript
    var func = comb("test2").partial("hello");
    var scope = {
        test2:function (arg) {
            return true;
        }
    };
    console.log(func.call(scope)); //true
```

`bindFirst`

Applying the named function to the argument passed into the function.

`node ./lib/string.js bindFirst`

```javascript
    var arr = [], push = comb("push").bindFirst(), length = comb("length").bindFirst();
    push(arr, 1, 2, 3, 4);
    length(arr); //4
    console.log(arr); //1,2,3,4
```

`applyFirst`

Same as bind first

`node ./lib/string.js applyFirst`

`singularize`

Singularizes a string.

`node ./lib/string.js singularize`

```javascript
    comb("posts").singularize().print();               //"post"
    comb("octopi").singularize().print();           //"octopus"
    comb("sheep").singularize().print();            //"sheep"
    comb("words").singularize().print();            //"word"
    comb("the blue mailmen").singularize().print(); //"the blue mailman"
    comb("CamelOctopi").singularize().print();      //"CamelOctopus"
```

`pluralize`

Pluralizes a string.

`node ./lib/string.js pluralize`

```javascript
    comb("post").pluralize().print();               //"posts"
    comb("octopus").pluralize().print();          //"octopi"
    comb("sheep").pluralize().print();            //"sheep"
    comb("word").pluralize().print();                //"words"
    comb("the blue mailman").pluralize().print(); //"the blue mailmen"
    comb("CamelOctopus").pluralize().print();     //"CamelOctopi"
```

`underscore`

Underscores a camelized string.

`node ./lib/string.js underscore`

```javascript
	comb('helloWorld').underscore().print(); // "hello_world"
	comb('column_name').underscore().print(); // "column_name"
	comb('columnName').underscore().print();  // "column_name"
```

`camelize`

Camelizes an underscored string.

`node ./lib/string.js camelize`

```javascript
	comb('hello_world').camelize().print(); // "helloWorld"
    comb('column_name').camelize().print(); // "columnName"
    comb('columnName').camelize().print();  // "columnName"
```

`pad`

Pad a string with whitespace or a specified string.

`node ./lib/string.js pad`

```javascript
    var str = comb("STR");
    str.pad(5).print(); //"  STR"
    str.pad(5, " ", true).print(); //"STR  "
    str.pad(5, "$", true).print(); //"$$STR"
```

`truncate`

`node ./lib/string.js truncate`

Truncates a string

```javascript
//from the beginning
comb("abcdefg").truncate(3).print();      //"abc";
//from the end
comb("abcdefg").truncate(3, true).print(); // "efg"
//omit the length
comb("abcdefg").truncate().print();       //"abcdefg"
```

`format`

Formats a string

`node ./lib/string.js format`

```javascript
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
```

`toArray`

Converts a string to an array.

`node ./lib/string.js toArray`


```javascript
    comb("a|b|c|d").toArray("|").print(); //["a","b","c","d"]
    comb("a").toArray("|").print();       //["a"]
    comb("").toArray("|").print();        //[]
```

`multiply`

`node ./lib/string.js multiply`

Multiplies a string

```javascript
comb("HELLO ").multiply(5).print();
```

`style`

Stylizes a string for terminal output.

`node ./lib/string.js style`

```javascript
	//prints a red string
    comb("string").style("red").print();
    //prints a bold green string
    comb("string").style(["green", "bold"]).print();
```

##Dates

`add`

Add the specified interval the specified number of times. See [comb.date.add](./comb_date.html#.add) for more arugment types.

```javascript

var dt = comb(new Date(2009, 1, 1, 1, 1, 1, 111)),
    dateFormat = comb("format").applyFirst("yyyy-MM-dd HH:mm:ss.SSS");
dateFormat(dt.add("years", 2));        //2011-02-01 01:01:01.111
dateFormat(dt.add("months", 2));       //2009-04-01 01:01:01.111
dateFormat(dt.add("days", 2));         //2009-02-03 01:01:01.111
dateFormat(dt.add("hours", 2));        //2009-02-01 03:01:01.111
dateFormat(dt.add("minutes", 2));      //2009-02-01 01:03:01.111
dateFormat(dt.add("seconds", 2));      //2009-02-01 01:01:03.111
dateFormat(dt.add("milliseconds", 2)); //2009-02-01 01:01:01.113

```

`compare`

compares this date to another.

```javascript

var d1 = new Date();
d1.setHours(0);
comb(d1).compare(d1); //0

var d2 = new Date();
d2.setFullYear(2005);
d2.setHours(12);
comb(d1).compare(d2, "date") //1
comb(d1).compare(d2, "datetime") //1

comb(d2).compare(d1, "date") //-1
comb(d2).compare(d1, "datetime") //-1

```

`difference`

Finds the difference between two dates. See [comb.date.difference](./comb_date.html#.difference).

```javascript

comb(new Date(2005, 11, 27)).difference(new Date(2006, 11, 27), "year"); //1

```

`format`

Formats a date with the specified formatting flags. See [comb.date.format](./comb_date.html#.format). 

```javascript
var date = comb(new Date(2009, 1, 1, 1, 1, 1, 111))
date.format("yyyy-MM-dd HH:mm:ss.SSS"); //2011-02-01 01:01:01.111
date.format("yyyy-MM-dd"); //2011-02-01
date.format("HH:mm:ss.SSS"); //01:01:01.111
```

`getDaysInMonth`

Returns the days in the dates month.

```javascript
comb(new Date(2006, 1, 1)).getDaysInMonth() //28
comb(new Date(2004, 1, 1)).getDaysInMonth() //29
comb(new Date(2000, 1, 1)).getDaysInMonth() //29
comb(new Date(1900, 1, 1)).getDaysInMonth() //28
comb(new Date(1800, 1, 1)).getDaysInMonth() //28
comb(new Date(1700, 1, 1)).getDaysInMonth() //28
comb(new Date(1600, 1, 1)).getDaysInMonth() //29
```

`getTimezoneName`

Returns the name of the timezone for the date.

```javascript
comb(new Date()).getTimezoneName().print();
```

`isLeapYear`

Returns a boolean indicating if the year is leap year.

```javascript
comb(new Date(1600, 0, 1)).isLeapYear(); //true
comb(new Date(2004, 0, 1)).isLeapYear(); //true
comb(new Date(2000, 0, 1)).isLeapYear(); //true
comb(new Date(2006, 0, 1)).isLeapYear(); //false
comb(new Date(1900, 0, 1)).isLeapYear(); //false
comb(new Date(1800, 0, 1)).isLeapYear(); //false
comb(new Date(1700, 0, 1)).isLeapYear(); //false
```

`isWeekend`

Returns if the date falls on a weekend.

```javascript
var thursday = comb(new Date(2006, 8, 21));
var saturday = comb(new Date(2006, 8, 23));
var sunday = comb(new Date(2006, 8, 24));
var monday = comb(new Date(2006, 8, 25));
thursday.isWeekend(); //false
saturday.isWeekend(); //true
sunday.isWeekend(); //true
monday.isWeekend(); //false
```

##Functions

`hitch`

Hitches a function to the specified scope, currying any extra arguments.

```javascript
var add = comb(function(arg1, arg2){
	return arg1 + arg2 * this.multiplier;
}).hitch({multiplier : 2}, 2);

add(10); //24
add(11); //26
add(12); //28
```

`bind`

Hitches a function to the specified scope, currying any extra arguments.

```javascript
var add = comb(function(arg1, arg2){
	return arg1 + arg2 * this.multiplier;
}).bind({multiplier : 2}, 2);

add(10); //24
add(11); //26
add(12); //28
```

`hitchIgnore`

Hitches a function to the specified scope, ignoring any extra arguments.

```javascript
var add = comb(function(arg1, arg2){
    //arg two will always be undefined.
	return arg1 + (arg2 || 0) * this.multiplier;
}).hitchIgnore({multiplier : 2}, 2);

add(10); //4
add(11); //4
add(12); //4
```

`bindIgnore`

Hitches a function to the specified scope, ignoring any extra arguments.

```javascript
var add = comb(function(arg1, arg2){
    //arg two will always be undefined.
	return arg1 + (arg2 || 0) * this.multiplier;
}).bindIgnore({multiplier : 2}, 2);

add(10); //4
add(11); //4
add(12); //4
```

`partial`

Returns a function that does not change execution scope but curries arguments.

```javascript
var arr = [];
Object.defineProperty(arr, "pushTwo", {
    value : comb(function(arg1){
        this.push(comb(arguments).toArray());
    }).partial(2),
    enumerable : false
});

arr.pushTwo(1);
arr.pushTwo(3);
console.log(arr); //[[2,1], [2,3]]
```

`applyFirst`

Creates a function that runs in the scope of the first arugment, and applies the rest.

```javascript
var arr = [];

var pushTwo = comb(function(val){
    this.push(comb(arguments).toArray());
}).applyFirst(2); 

pushTwo(arr, 1);
pushTwo(arr, 2);
pushTwo(arr, 3);
console.log(arr); //[ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]

```

`bindFirst`

Same as apply first.

```javascript
var arr = [];

var pushTwo = comb(function(val){
    this.push(comb(arguments).toArray());
}).bindFirst(2); 

pushTwo(arr, 1);
pushTwo(arr, 2);
pushTwo(arr, 3);
console.log(arr); //[ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
```

`curry`

Curries a function the specified number of times.

```javascript
var func = comb(function (a, b, c, d) {
    return [this.test, a,b,c,d];
});
var curried = func.curry(4, {test:true});
console.log(curried("a")("b")("c")("d"));
```

`extend`

Extends the prototype of a function.

```javascript
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
```

##Number

`round`
Rounds a number.

```javascript
comb(10.000009).round(2).print();  //10
comb(10.000009).round(5).print();  //10.00001
comb(10.0009).round(3).print();    //10.001
comb(10.0009).round(2).print();    //10
comb(10.0009).round(3).print();    //10.001
comb(10.0009).round(2, 1).print(); //11
```

`roundCeil`

Rounds a number up. 

```javascript
comb(10.000004).roundCeil(2).print();  //10.01
comb(10.000004).roundCeil(5).print();  //10.00001
comb(10.0004).roundCeil(3).print();    //10.001
comb(10.0004).roundCeil(3).print();    //10.001
comb(10.0004).roundCeil(2).print();    //10.01

```

##Objects

`hitch`

Hitches a function to run in the scope of this object.

```javascript
var scope = comb({test : "test"});

var func = scope.hitch(function(){
	return this.test;
});

func(); //"test";

```

`hitchIgnore`

Hitches a function to run in the scope of this object, ignoring extra arguments.

```javascript
var scope = comb({test : "test"});

var func = scope.hitchIgnore(function(){
	return [this.test].concat(comb(arguments).toArray());
});

func("hello"); //["test"];

```

`bind`

Binds a function to run in the scope of this object.

```javascript
var scope = comb({test : "test"});

var func = scope.bind(function(){
	return this.test;
});

func(); //"test";

```

`bindIgnore`

Binds a function to run in the scope of this object, ignoring extra arguments.

```javascript
var scope = comb({test : "test"});

var func = scope.bindIgnore(function(){
	return [this.test].concat(comb(arguments).toArray());
});

func("hello"); //["test"];

```

`merge`

Merges another object into this object.

```javascript
var obj = comb({a : "b"});
console.log(obj.merge({b : "c"})); //{a : "b", b : "c"}
console.log(obj.merge({a : "d"})); //{a : "d", b : "c"}
```

`extend`

Merges another object into this object.

```javascript
var obj = comb({a : "b"});
console.log(obj.extend({b : "c"})); //{a : "b", b : "c"}
console.log(obj.extend({a : "d"})); //{a : "d", b : "c"}
```

`deepMerge`

Deeply merges another object into this object, meaning that merges in nested objects.


```javascript
var obj = comb({test:true, a:{b:4}}), format = comb("%4j");

format.format([obj.deepMerge({test2:false, a:{c:3}})]).print();
/*
 * {
 *   "test": true,
 *   "a": {
 *       "b": 4,
 *       "c": 3
 *   },
 *   "test2": false
 * }
 */


format.format([obj.deepMerge({test3:"hello", test4:"world", a:{d:{e:2}}})]).print();
/*
 * {
 *   "test": true,
 *   "a": {
 *       "b": 4,
 *       "c": 3,
 *       "d": {
 *           "e": 2
 *       }
 *   },
 *   "test2": false,
 *   "test3": "hello",
 *   "test4": "world"
 * }
 */ 

format.format([obj.merge({a:{d:{f:{g:1}}}})]).print();
/*
 * {
 *   "test": true,
 *   "a": {
 *       "d": {
 *           "f": {
 *               "g": 1
 *           }
 *       }
 *   },
 *   "test2": false,
 *   "test3": "hello",
 *   "test4": "world"
 * }
 */
```

`forEach`

Iterate through each key/value pair in an object.

```javascript
var obj = {a : "b", c : "d", e : "f"};   
comb(obj).forEach(function(value, key){  
    console.log(value, key);             
});                                      
                           
```

`filter`

Filters out key/value pairs in an object. Filters out key/value pairs that return a falsey value from the iterator.
                                                                                                                   
```javascript
var obj = {a : "b", c : "d", e : "f"};                                                                             
comb(obj).filter(function(value, key){                                                                             
    return value == "b" || key === "e";                                                                            
}); //{a : "b", e : "f"};                                                                                                                                                                                   
                                                                                                                   
```                                                                                                                

`invert`

 Returns a new hash that is the invert of the hash.   
                                                      
 ```javascript
 var obj = {a : "b", c : "d", e : "f"};               
 comb(obj).invert(); //{b : "a", d : "c", f : "e"}                                                         
 ```                                                  

`values`

Returns the values of a hash.             
                                          
```javascript
var obj = {a : "b", c : "d", e : "f"};    
comb(obj).values(); //["b", "d", "f"]                                                                                          
```                                       

`toArray`

Converts a hash to an array.                                    
                                                                
```javascript
var obj = {a : "b", c : "d", e : "f"};                          
comb(obj).toArray(); //[["a", "b"], ["c", "d"], ["e", "f"]]     
```


##Arguments

`toArray`
 
Converts an arugments object to an array.

```javascript
function getArgs(){
	return comb(arguments).toArray();
}

function getArgsSlice(slice){
	return comb(arguments).toArray(slice);
}


getArgs(1,2,3).print(); //[1,2,3]
getArgsSlice(1,2,3).print(); //[2,3]
getArgsSlice(2,2,3).print(); //[3]

```


##Arrays

`style`
Styles each string in the array.

```javascript
//prints red green and blue in red to the terminal
comb(["red", "green","blue"]).style("red").join("\n")); 
```

`forEach`

Chainable version of `Array.prototype.forEach` returning the original array

```javascript
comb([1,2,3])
	.forEach(function(num){
		console.log(num);
	})
	.map(function(num){
		return num * 2;
	})
	.forEach(function(num){
		console.log(num);
	});
```

`zip`

Zips array together.

```javascript
comb([1]).zip([2], [3]);    // [[ 1, 2, 3 ]]
comb([1, 2]).zip([2], [3]); // [[ 1, 2, 3 ], [2, null, null]]
comb([1, 2, 3]).zip(a, b);  //[[1, 4, 7],[2, 5, 8],[3, 6, 9]]
```

`sum`

Sums an array

```javascript
comb([1,2,3]).sum(); //6
comb([1,2,3]).sum().isNumber(); //true
```

`avg`

Finds the average of an array of numbers.

```javascript
comb([1,2,3]).avg(); //2
comb([1,2,3]).avg().isNumber(); //true
```

`sort`

Sorts an array. **NOTE** This does not change the original array.

```javascript
var arr = [3,2,1];
comb(arr).sort()); //[1,2,3]
arr); //[3,2,1]

var arr2 = [{a : 3}, {a : 2}, {a : 1}];
comb(arr).sort("a").pluck("a"); //[1,2,3]
comb(arr).pluck("a");           //[3,2,1]

```

`min`

Finds the minimum value in an array.

```javascript
var arr = [3,2,1];
comb(arr).min(); //1

var arr2 = [{a : 3}, {a : 2}, {a : 1}];
comb(arr).min("a"); //{a : 1}
```

`max`

Finds the maximum value in an array.

```javascript
var arr = [3,2,1];
comb(arr).max(); //3

var arr2 = [{a : 3}, {a : 2}, {a : 1}];
comb(arr).max("a"); //{a : 3}
```

`difference`

Finds the difference between two arrays.

```javascript
comb([true, false]).difference([false]); //[true]
comb([1, 2, 3]).difference([2]);        //[1, 3]
comb([1, 2, 3]).difference([2], [3]);   //[1]
comb(["a", "b", 3]).difference([3]);    //["a", "b"]
comb([a, b, c]).difference([b, c]);     //[a]
```

`removeDuplicates`

Removes duplicates from an array.

```javascript
comb([1, 2, 2, 3, 3, 3, 4, 4, 4]).removeDuplicates(); //[1, 2, 3, 4]
comb(["a", "b", "b"]).removeDuplicates();             // ["a", "b"]
```

`unique`

Alias to `removeDuplicates`

```javascript
comb([1, 2, 2, 3, 3, 3, 4, 4, 4]).unique(); // [1, 2, 3, 4]);
comb(["a", "b", "b"]).unique();            // ["a", "b"]);
```

`rotate`

Rotates an array by `1` or the specified number of places.

```javascript
var arr = comb(["a", "b", "c", "d"]);
arr.rotate();   // ["b", "c", "d", "a"]);
arr.rotate(2);  // ["c", "d", "a", "b"]);
arr.rotate(3);  // ["d", "a", "b", "c"]);
arr.rotate(4);  // ["a", "b", "c", "d"]);
arr.rotate(-1); // ["d", "a", "b", "c"]);
arr.rotate(-2); // ["c", "d", "a", "b"]);
arr.rotate(-3); // ["b", "c", "d", "a"]);
arr.rotate(-4); // ["a", "b", "c", "d"]);

```

`permutations`

Finds all permutaions of the array.

```javascript
var arr = comb([1, 2, 3]);
arr.permutations();  //[
					  //  [ 1, 2, 3 ],
                     //  [ 1, 3, 2 ],
					  //  [ 2, 3, 1 ],
					  //  [ 2, 1, 3 ],
					  //  [ 3, 1, 2 ],
					  //  [ 3, 2, 1 ]
					  // ]
            					 
arr.permutations(2); //[
					  //  [ 1, 2],
					  //  [ 1, 3],
					  //  [ 2, 3],
					  //  [ 2, 1],
					  //  [ 3, 1],
					  //  [ 3, 2]
					  //]
            					   
arr.permutations(1); //[
					  //  [1],
					  //  [2],
					  //  [3]
					  //]
```

`transpose`

Transposes a multidimensional array.

```javascript
comb([[1, 2, 3],[4, 5, 6]]).transpose(); //[
										  // [ 1, 4 ],
										  // [ 2, 5 ],
										  // [ 3, 6 ]
										  //]
```

`valuesAt`

Retrieves the values at the specified locations.

```javascript
var arr = comb(["a", "b", "c", "d"]);
arr.valuesAt(1, 2, 3);    //["b", "c", "d"]);
arr.valuesAt(1, 2, 3, 4); //["b", "c", "d", null]);
arr.valuesAt(0, 3);       //["a", "d"]);
```

`union`

Returns the union of the value with the passed in arrays.

```javascript
comb(["a", "b", "c"]).union(["b", "c", "d"]);  //["a", "b", "c", "d"]);
comb(["a"]).union(["b"], ["c"], ["d"], ["c"]); //["a", "b", "c", "d"]);
```

`intersect`

Finds the intersection of arrays.

```javascript
comb([1, 2]).intersect([2, 3], [2, 3, 5]);                   //[2]
comb([1, 2, 3]).intersect([2, 3, 4, 5], [2, 3, 5]);          //[2, 3]
comb([1, 2, 3, 4]).intersect([2, 3, 4, 5], [2, 3, 4, 5]);    //[2, 3, 4]
comb([1, 2, 3, 4, 5]).intersect([1, 2, 3, 4, 5], [1, 2, 3]); //[1, 2, 3]
        
```

`powerSet`

Finds the powerset of an array.

```javascript
comb([1, 2]).powerSet()); //[
						   //  [],
						   //  [ 1 ],
						   //  [ 2 ],
						   //  [ 1, 2 ]
						   //]
```								       

`cartesian`

Finds the cartesian product of arrays.

```javascript
comb([1, 2]).cartesian([2, 3]); //[
						         // [1, 2],
						         // [1, 3],
						         // [2, 2],
						         // [2, 3]
						         //]
```

`compact`

Compacts an array removing `undefined` or `null`.

```javascript
comb([1, null, undefined, x, 2]).compact(); //[1, 2]
```

`multiply`

Duplicates the elements in an array the specified number of times.

```javascript
comb([1, 2, 3]).multiply(2); //[1, 2, 3, 1, 2, 3]
```

`flatten`

Flattens arrays.

```javascript
comb([1, 2]).flatten([2, 3], [3, 4]);     //[1, 2, 2, 3, 3, 4]
comb([[1], [2], [3]]).flatten();          //[1, 2, 3]
comb([[1, 2],2]).flatten([2, 3], [3, 4]); //[[1, 2],2,2,3,3,4]

```

`pluck`

Plucks values from each item in the array.

```javascript
var arr = comb([                                                                          
	{name:{first:"Fred", last:"Jones"}, age:50, roles:["a", "b", "c"]},   
	{name:{first:"Bob", last:"Yukon"}, age:40, roles:["b", "c"]},         
	{name:{first:"Alice", last:"Palace"}, age:35, roles:["c"]},           
	{name:{first:"Johnny", last:"P."}, age:56, roles:[]}                  
]);                                                                         

arr.pluck("name.first"); //["Fred", "Bob", "Alice", "Johnny"] 
arr.pluck("age"); //[50, 40, 35, 56]                          
arr.pluck("roles.length"); //[3, 2, 1, 0]                     
arr.pluck("roles.0"); //["a", "b", "c", undefined]            
```

`invoke`

Invokes the specified method on each item in the array.

```javascript
function person(name, age){                                                                  
    return {                                                                                 
        getName : function(){                                                                
            return name;                                                                     
        },                                                                                   
        setName : function(newName){                                                         
            name = newName;                                                                  
        },                                                                                   
                                                                                             
        getOlder : function(){                                                               
            age++;                                                                           
            return this;                                                                     
        },                                                                                   
                                                                                             
        getAge : function(){                                                                 
            return age;                                                                      
        }                                                                                    
    };                                                                                       
}                                                                                            
                                                                                             
var arr = comb([person("Bob", 40), person("Alice", 35), person("Fred", 50), person("Johnny", 56)]);
                                                                                             
arr.invoke("getName"); //["Bob", "Alice", "Fred", "Johnny"]                                                                                                      
arr.invoke("getOlder").invoke("getAge"); //[41, 36, 51, 57];                                                                                                     
```
