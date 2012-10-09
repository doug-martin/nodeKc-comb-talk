var comb = require("comb");

function round() {
    comb(10.000009).round(2).print();  //10
    comb(10.000009).round(5).print();  //10.00001
    comb(10.0009).round(3).print();    //10.001
    comb(10.0009).round(2).print();    //10
    comb(10.0009).round(3).print();    //10.001
    comb(10.0009).round(2, 1).print(); //11
}

function roundCeil() {
    comb(10.000004).roundCeil(2).print();  //10.01
    comb(10.000004).roundCeil(5).print();  //10.00001
    comb(10.0004).roundCeil(3).print();    //10.001
    comb(10.0004).roundCeil(3).print();    //10.001
    comb(10.0004).roundCeil(2).print();    //10.01
}

var examples = module.exports = {
    round:round,
    roundCeil:roundCeil
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


