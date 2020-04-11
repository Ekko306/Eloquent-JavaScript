// let rabbit = {}
// rabbit.speak = function (line) {
//     console.log(`The rabbit says '${line}'`)
// }
// rabbit.speak("I'm alive")

// function speak(line) {
//     console.log(`The ${this.type} rabbit says '${line}'`)
// }
// let whiteRabbit = {type: "white", speak}
// let hungryRabbit = {type: "hungry", speak}
//
// whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!")
// hungryRabbit.speak("I could use a carrot right now.")
// speak.call(hungryRabbit, "Burp")

// function normalize() {
//     console.log(this.coords.map(n => n/this.length));
// }
// normalize.call({coords: [0, 2, 3], length: 5})
//
// function normalize() {
//     console.log([0, 2, 3].map(n => n/this.length));
// }
// normalize.call({length: 5})

// let empty = {}
// console.log(empty.toString)
// console.log(empty.toString())

// console.log(Object.getPrototypeOf({}) == Object.prototype)
// console.log(Object.getPrototypeOf(Object.prototype))
// console.log(Object.getPrototypeOf(Math.max) == Function.prototype)
// console.log(Object.getPrototypeOf([]) == Array.prototype)
// console.log(Object.getPrototypeOf(Function.prototype) == Object.prototype)

// let protoRabbit = {
//     speak(line) {
//         console.log(`The '${this.type} rabbit says '${line}'`)
//     }
// }
// let killerRabbit = Object.create(protoRabbit)
// killerRabbit.type = "killer"
// killerRabbit.speak("SKPEEE!")

// function makeRabbit(type) {
//     let rabbit = Object.create(protoRabbit);
//     rabbit.type = type;
//     return rabbit
// }

// console.log(Object.getPrototypeOf(Rabbit) == Function.prototype)
// console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype)

// function Rabbit(type) {
//     this.type = type
// }
// Rabbit.prototype.speak = function(line) {
//     console.log(`The ${this.type} rabbit says '${line}'`)
// }
// let weirdRabbit = new Rabbit("weird")
// weirdRabbit.speak("I'm weird")

// class Rabbit {
//     constructor(type) {
//         this.type = type
//     }
//     speak(line) {
//         console.log(`The ${this.type} rabbit says '${line}'`)
//     }
// }
// let blackRabbit = new Rabbit("black")
// blackRabbit.speak("I'm black!")
// let killerRabbit = new Rabbit("killer")
//
// Rabbit.prototype.teeth = "small"
// console.log(killerRabbit.teeth)
// killerRabbit.teeth = "long, sharp and bloody"
// console.log(killerRabbit.teeth)
// console.log(blackRabbit.teeth)
// console.log(Rabbit.prototype.teeth)
//

// console.log(Array.prototype.toString() == Object.prototype.toLocaleString())
// console.log([1, 2].toString())
//
// console.log(Object.prototype.toString.call([1, 2]))

// let ages = {
//     Boris: 39,
//     Liang: 22,
//     Julia: 62
// }
// console.log(`Julia is ${ages["Julia"]}`)
// console.log("Is Jack's age known?", "Jack" in ages)
// console.log("Is toString's age known?", "toString" in ages)

// console.log("toString" in Object.create(null))
//
// let ages = new Map()
// ages.set("Boris", 39)
// ages.set("Liang", 22)
// ages.set("Julia", 62)
//
// console.log(`Juila is ${ages.get("Julia")}`)
// console.log("Is Jack's age know?", ages.has("Jack"))
// console.log(ages.has("toString"))

// console.log({x: 1}.hasOwnProperty("x"))
// console.log({x: 1}.hasOwnProperty("toString"))

// Rabbit.prototype.toString = function () {
//     return `a ${this.type} rabbit`
// }
// console.log(String(blackRabbit))

// let sym = Symbol("name")
// console.log(sym == Symbol("name"))
// Rabbit.prototype[sym] = 55
// console.log(blackRabbit[sym])
//
// const toStringSymbol = Symbol("toString")
// Array.prototype[toStringSymbol] = function() {
//     return `${this.length} cm of blue yarn`
// }
// console.log([1, 2].toString())
// console.log([1, 2][toStringSymbol]())
//
// console.log(String([1,2]))

// let stringObject = {
//     [toStringSymbol]() {return "a jute rope"}
// }
// console.log(stringObject[toStringSymbol()])

// let stringObject = {
//     [toStringSymbol]() { return "a jute rope"; }
// };
// console.log(stringObject[toStringSymbol]());
// → a jute rope

// let okIterator = "OK"[Symbol.iterator]()
// console.log(okIterator.next())
// console.log(okIterator.next())
// console.log(okIterator.next())

class Matrix {
    constructor(width, height, element = (x,y) => undefined) {         //element是一个自定义函数
        this.width = width
        this.height = height
        this.content = []
        for (let y = 0; y<height; y++) {
            for (let x =0 ; x<width; x++){
                this.content[y * width +x] = element(x, y)
            }
        }
    }
    get(x, y){
        return this.content[y* this.width +x]
    }
    set(x, y, value){
        this.content[y * this.width + x] = value
    }
}

// let a = new Matrix(1, 2, (x, y) => `value ${x}, ${y}`)
// console.log(a.get(1,0))

// class MatrixIterator {
//     constructor(matrix) {
//         this.x = 0
//         this.y = 0
//         this.matrix = matrix
//     }
//
//     next() {
//         if(this.y == this.matrix.height) return {done: true};
//
//         let value = {x: this.x,
//                      y: this.y,
//                      value: this.matrix.get(this.x, this.y)};
//         this.x++;
//         if(this.x == this.matrix.width){
//             this.x = 0
//             this.y++
//         }
//         return {value, done: false}
//     }
// }
//
// Matrix.prototype[Symbol.iterator] = function(){
//     return new MatrixIterator(this)
// }
//
// let matrix = new Matrix(3, 5,(x, y)=> `value ${x},${y}`)
// for (let{x, y, value} of matrix){
//     console.log(x, y, value)
// }
//
// let varyingSize = {
//     get size(){
//         return Mth.floor(Math,)
//     }
// }

// class Temperature {
//     constructor(celsius) {
//         this.celsius = celsius
//     }
//     get fahrenheit() {
//         return this.celsius * 1.8 + 32
//     }
//     set fahrenheit(value) {      //看看关键字是get set
//         this.celsius = (value -32) /1.8
//     }
//     static fromFahrenheit(value) {
//         return new Temperature((value - 32)/32)
//     }
// }
//
// let temp = new Temperature(22)
// console.log(temp.fahrenheit)    //get
// temp.fahrenheit = 86      //set
// console.log(temp.celsius)

class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) =>{
            if( x< y) return element(y, x)
            else return element(x, y)
        });
    }
    set(x, y, value){
        super.set(x, y, value)
        if(x!=y) {
            super.set(y, x, value)
        }
    }
}
console.log(123)
let matrix = new SymmetricMatrix(5, (x, y)=> `${x}, ${y}`)
console.log(matrix.get(2,3))

console.log(
    new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true