var comb = require("comb");

comb(exports).merge({
    Dog:require("./dog"),
    Breed:require("./breed"),
    Wolf:require("./wolf"),
    Mammal:require("./mammal")
})