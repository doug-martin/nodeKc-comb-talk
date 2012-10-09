var comb = require("comb");
function toArray() {
    function getArgs() {
        return comb(arguments).toArray();
    }

    function getArgsSlice(slice) {
        return comb(arguments).toArray(slice);
    }


    getArgs(1, 2, 3).print(); //[1,2,3]
    getArgsSlice(1, 2, 3).print(); //[2,3]
    getArgsSlice(2, 2, 3).print(); //[3]
}

toArray();