var animals = require("./lib"),
    Mammal = animals.Mammal,
    Wolf = animals.Wolf,
    Dog = animals.Dog,
    Breed = animals.Breed;

console.log("Mammal");
console.log(Mammal.soundOff("Im a mammal!!"));

var myMammal = new Mammal({type:"mymammal"});
console.log(myMammal.speak()); // "A mammal of type mymammal sounds like"
console.log(myMammal.type); //"mymammal"
myMammal.type = "mammal";
console.log(myMammal.type); //"mammal"

console.log("\n\nWolf");
console.log(Wolf.soundOff()); //Im a mammal!! that growls

var myWolf = new Wolf();
console.log("myWolf instanceof Mammal is %s", myWolf instanceof Mammal); //true
console.log("myWolf instanceof Wolf is %s", myWolf instanceof Wolf); //true
console.log("myWolf reproduces a Wolf %s", myWolf.reproduce() instanceof Wolf);


console.log("\n\nDog");
console.log(Dog.soundOff()); //Im a mammal!! that growls but now barks

var myDog = new Dog();
console.log("myDog instanceof Mammal is %s", myDog instanceof Mammal); //true
console.log("myDog instanceof Wolf is %s", myDog instanceof Wolf); //true
console.log("myDog instanceof Dog is %s", myDog instanceof Dog); //true
console.log("Dog reproduces a Dog %s", myDog.reproduce() instanceof Dog);


console.log("\n\nBreed");
console.log(Breed.soundOff());//"IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!"

var myBreed = new Breed({color:"gold", type:"lab"});
console.log("myBreed instanceof Dog is %s", myBreed instanceof Dog); //true
console.log("myBreed instanceof Wolf is %s", myBreed instanceof Wolf); //true
console.log("myBreed instanceof Mammal is %s", myBreed instanceof Mammal); //true
console.log(myBreed.speak()); //"A mammal of type lab sounds like a woof thats domesticated with a high pitch!"
console.log(myBreed.type); //"lab"
console.log(myBreed.color); //"gold"
console.log(myBreed.sound); //"woof"

console.log("Breed reproduces a Breed %s", myBreed.reproduce() instanceof Breed);


