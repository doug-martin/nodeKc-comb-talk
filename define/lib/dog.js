var comb = require("comb"),
    Wolf = require("./wolf.js");

//Typical hierarchical inheritance
// Mammal->Wolf->Dog
comb.define(Wolf, {
    instance:{
        constructor:function (options) {
            options = options || {};
            this._super(arguments);
            //override Wolfs initialization of sound to woof.
            this._sound = "woof";

        },

        speak:function () {
            //Should return "A mammal of type mammal sounds like a growl thats domesticated"
            return this._super(arguments) + " thats domesticated";
        }
    },

    static:{
        soundOff:function () {
            //should return "I'm a mammal!! that growls but now barks"
            return this._super(arguments) + " but now barks";
        }
    }
}).as(module);




