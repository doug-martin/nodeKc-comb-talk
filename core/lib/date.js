var comb = require("comb");

function add() {
    var dt = comb(new Date(2009, 1, 1, 1, 1, 1, 111));
    var dateFormat = comb("format").applyFirst("yyyy-MM-dd HH:mm:ss.SSS");
    dateFormat(dt.add("years", 2)).print();        //2011-02-01 01:01:01.111
    dateFormat(dt.add("months", 2)).print();       //2009-04-01 01:01:01.111
    dateFormat(dt.add("days", 2)).print();         //2009-02-03 01:01:01.111
    dateFormat(dt.add("hours", 2)).print();        //2009-02-01 03:01:01.111
    dateFormat(dt.add("minutes", 2)).print();      //2009-02-01 01:03:01.111
    dateFormat(dt.add("seconds", 2)).print();      //2009-02-01 01:01:03.111
    dateFormat(dt.add("milliseconds", 2)).print(); //2009-02-01 01:01:01.113
}


function compare() {
    var d1 = new Date();
    d1.setHours(0);
    console.log(comb(d1).compare(d1)); //0

    var d2 = new Date();
    d2.setFullYear(2005);
    d2.setHours(12);
    console.log(comb(d1).compare(d2, "date")); //1
    console.log(comb(d1).compare(d2, "datetime")); //1

    console.log(comb(d2).compare(d1, "date")); //-1
    console.log(comb(d2).compare(d1, "datetime")); //-1
}

function difference() {
    comb(new Date(2005, 11, 27)).difference(new Date(2006, 11, 27), "year").print(); //1
}


function format() {
    var date = comb(new Date(2009, 1, 1, 1, 1, 1, 111));
    date.format("yyyy-MM-dd HH:mm:ss.SSS").print();
    ; //2011-02-01 01:01:01.111
    date.format("yyyy-MM-dd").print();
    ; //2011-02-01
    date.format("HH:mm:ss.SSS").print();
    ; //01:01:01.111
}


function getDaysInMonth() {
    comb(new Date(2006, 1, 1)).getDaysInMonth().print(); //28
    comb(new Date(2004, 1, 1)).getDaysInMonth().print(); //29
    comb(new Date(2000, 1, 1)).getDaysInMonth().print(); //29
    comb(new Date(1900, 1, 1)).getDaysInMonth().print(); //28
    comb(new Date(1800, 1, 1)).getDaysInMonth().print(); //28
    comb(new Date(1700, 1, 1)).getDaysInMonth().print(); //28
    comb(new Date(1600, 1, 1)).getDaysInMonth().print(); //29
}


function getTimezoneName() {
    comb(new Date()).getTimezoneName().print();
}


function isLeapYear() {
    console.log(comb(new Date(1600, 0, 1)).isLeapYear()); //true
    console.log(comb(new Date(2004, 0, 1)).isLeapYear()); //true
    console.log(comb(new Date(2000, 0, 1)).isLeapYear()); //true
    console.log(comb(new Date(2006, 0, 1)).isLeapYear()); //false
    console.log(comb(new Date(1900, 0, 1)).isLeapYear()); //false
    console.log(comb(new Date(1800, 0, 1)).isLeapYear()); //false
    console.log(comb(new Date(1700, 0, 1)).isLeapYear()); //false
}


function isWeekend() {
    var thursday = comb(new Date(2006, 8, 21));
    var saturday = comb(new Date(2006, 8, 23));
    var sunday = comb(new Date(2006, 8, 24));
    var monday = comb(new Date(2006, 8, 25));
    console.log(thursday.isWeekend()); //false
    console.log(saturday.isWeekend()); //true
    console.log(sunday.isWeekend()); //true
    console.log(monday.isWeekend()); //false
}

var examples = module.exports = {
    add:add,
    compare:compare,
    difference:difference,
    format:format,
    getDaysInMonth:getDaysInMonth,
    getTimezoneName:getTimezoneName,
    isLeapYear:isLeapYear,
    isWeekend:isWeekend
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
