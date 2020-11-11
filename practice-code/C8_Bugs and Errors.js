// function canYouSpotTheProblem() {
//     "use strict" //不加use strict这里悄悄创建一个全局counter然后绑定上去使用
//     for (counter = 0; counter<10; counter++) {
//         console.log("Happy happy")
//     }
// }
// canYouSpotTheProblem()

//
// function Person(name) {this.name = name;}
// let ferdinand = Person("Ferdinand")
// console.log(name)  //应该是undefined 但是 绑定到一个全局的name

// "use strict";
// function Person(name) {this.name = name;}
// let ferdinand = Person("Ferdinand")    //忘记了new 无妨将name绑定到ferdinand
// console.log(name)  //应该是undefined 但是 绑定到一个全局的name
// with (a>1);

// // (VillageState, Array) -> {direction: string, memory: Array}
// function goalOrientedRobot(state, memory) {}

// function test(label, body) {
//     if (!body()) console.log(`Failed: ${label}`);
// }
//
// test("convert Latin text to uppercase", () => {
//     return "hello".toUpperCase() == "HELLO";
// });
// test("convert Greek text to uppercase", () => {
//     return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
// });
// test("don't convert case-less characters", () => {
//     return "مرحبا".toUpperCase() == "مرحبا";
// });

// function numberToString(n, base = 10) {
//     let result = "", sign = "";
//     if (n<10) {
//         sign = "-"
//         n = -n
//     }
//     do {
//         result = String(n % base) +result
//         n /= base  //n = Math.floor(n/base)
//     } while (n>0);
//     return sign + result
// }
// console.log(numberToString(13, 10))

// function promptNumber(question) {
//     let result = Number(prompt(question))
//     if (Number.isNaN(result)) return null
//     else return result
// }
//
// function lastElement(array) {
//     if (array.length == 0) {
//         return {failed: true}
//     } else {
//         return {element: array[array.length -1]}
//     }
// }

// function promptDirection(question) {
//     let result = prompt(question);   //prompt alert 只有在服务端html页面配合nodejs才有用
//     if (result.toLowerCase() == "left") return "L";
//     if (result.toLowerCase() == "right") return "R";
//     throw new Error("Invalid direction: " + result);  //这个是必执行的 但是 只会看look不会看这里
// }
//
// function look() {
//     if (promptDirection("Which way?") == "L") {
//         return "a house";
//     } else {
//         return "two angry bears";
//     }
// }
//
// try {
//     console.log("You see", look());
// } catch (error) {
//     console.log("Something went wrong: " + error);
// }

// const accounts = {
//     a: 100,
//     b: 0,
//     c: 20
// };
//
// function getAccount() {
//     let accountName = prompt("Enter an account name");
//     if (!accounts.hasOwnProperty(accountName)) {
//         throw new Error(`No such account: ${accountName}`);
//     }
//     return accountName;
// }
//
// function transfer(from, amount) {
//     if (accounts[from] < amount) return;
//     accounts[from] -= amount;
//     accounts[getAccount()] += amount;
//     console.log(accounts)
// }
//
// transfer("a", 20)

// for (;;){
//     try {
//         let dir = promtDirection("where?");
//         console.log("You chose", dir)
//         break;
//     } catch (e) {
//         console.log("Not a valid direction. Try again.")
//     }
// }

// class InputError extends Error {}
//
// function promptDirection(question) {
//     let result = "l"
//     if(result.toLowerCase() === "left") return "L";
//     if(result.toLowerCase() === "right") return "R";
//     throw new InputError("Invalid direction: " + result)
// }
//
// for(;;){
//     try {
//         let dir = promptDirection("Where?")
//         console.log("You chose ", dir)
//         break;
//     } catch(e) {
//         if( e instanceof InputError){
//             console.log("Not a valid direction. Try again")
//         } else {
//             throw e;
//         }
//     }
// }

// function firstElement(array){
//     if(array.length == 0) {
//         throw new Error("firstElement called with []")
//     }
//     return array[0]
// }