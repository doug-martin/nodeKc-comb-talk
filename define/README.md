#comb.define

This is the backbone for much of combs utilities such as logging and collections.

##Features
* Multi inheritance
* Defininiton of both `instance` and `static` method.
* Access to class from within an instance
* Inheritance in `static` methods also!
* Static initialization.
* Creation of `getters` and `setters`



##Example

The example provided creates the following classes

* `Mammal` : base class of all `Mammals` (`Mammal`)
* `Wolf` : base class for wolf animals (`Mammal => Wolf`)
* `Dog` : base class for dog animals (`Mammal => Wolf => Dog`)
* `Breed` : breed of a dog (`Mammal => Wolf => Dog => Breed`)

###Expected Output

`node ./index.js`

```
Mammal
Im a mammal!!
A mammal of type mymammal sounds like
mymammal
mammal


Wolf
Im a mammal!! that growls
myWolf instanceof Mammal is true
myWolf instanceof Wolf is true
myWolf reproduces a Wold true


Dog
Im a mammal!! that growls but now barks
myDog instanceof Mammal is true
myDog instanceof Wolf is true
myDog instanceof Dog is true
Dog reproduces a Dog true


Breed
IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!
myBreed instanceof Dog is true
myBreed instanceof Wolf is true
myBreed instanceof Mammal is true
A mammal of type lab sounds like a woof thats domesticated with a high pitch!
lab
gold
woof
Breed reproduces a Breed true

Process finished with exit code 0


```


