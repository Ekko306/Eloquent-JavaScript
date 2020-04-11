// let objectA = {a:1, b:2}
// Object.assign(objectA, {b:3, c:4});  // b会被更新
// console.log(objectA)

// console.log(typeof([]))
// let journal = [
//     {events: ["work", "touched tree", "pizza",
//             "running", "television"],
//         squirrel: false},
//     {events: ["work", "ice cream", "cauliflower",
//             "lasagna", "touched tree", "brushed teeth"],
//         squirrel: false},
//     {events: ["weekend", "cycling", "break", "peanuts",
//             "beer"],
//         squirrel: true},
//     /* and so on... */
// ];
// console.log(journal)

// let object1 = {value: 10};
// let object2 = object1;
// let object3 = {value: 10};
// console.log(object1 == object2);   //相等 有相同的绑定
// console.log(object1 == object3);   // 值相同 但是是不同对象
//
// object1.value = 15
// console.log(object2.value)
// console.log(object3.value)

// let arr1 ="syp"
// let arr2 ="syp"
// arr2 =arr1
// console.log(arr1 == arr2)   //字符串 数字 就是只要值相同就完全相同
// console.log(arr1 === arr2)
// arr2 = "abc"    //并且不会连带绑定更改 就是死的
// console.log(arr1)

// const score = {visitors: 0, home: 0}
// score.visitors = 1;  //可以 用const 可以改变内容
// console.log(score)
// score = {visitors: 1, home: 0} //报错 因为 const只能指向同一个物体

// let journal = [];
// function addEntry(events, squirrel) {
//     journal.push({events, squirrel});
// }
//
// addEntry(["work", "touched tree", "pizza", "running",
//     "television"], false);
// addEntry(["work", "ice cream", "cauliflower", "lasagna",
//     "touched tree", "brushed teeth"], false);
// addEntry(["weekend", "cycling", "break", "peanuts",
//     "beer"], true);
//
// function phi(table) {
//     return (table[3] * table[0] - table[2] * table[1])/
//         Math.sqrt((table[2] + table[3]) *
//                     (table[0] + table[1]) *
//                     (table[1] + table[3]) *
//                     (table[0] + table[2])
//         )
// }
//
// console.log(phi([76, 9, 4, 1]))
//
// require('./journal.js')
//
// function tableFor(event, journal) {
//     let table = [0, 0, 0, 0];
//     for (let i = 0; i < journal.length; i++) {
//         let entry = journal[i], index = 0;
//         if(entry.events.includes(event)) index +=1;
//         if(entry.squirrel) index += 2;
//         table[index] += 1;
//     }
//     return table;
// }
// console.log(tableFor("carrot", JOURNAL))

// for (let entry of JOURNAL){
//     console.log(`${entry.events.length} events. `)
// }

// function journalEvents(journal) {
//     let events = [];
//     for (let entry of journal){
//         for (let event of entry.events) {
//             if (!events.includes(event)) {   //太优美了
//                 events.push(event);
//             }
//         }
//     }
//     return events
// }
//
// console.log(journalEvents(JOURNAL))

// for (let event of journalEvents(JOURNAL)) {
//     console.log(event + ":", phi(tableFor(event, JOURNAL)))
// }

// for (let event of journalEvents(JOURNAL)) {
//     let correlation = phi(tableFor(event, JOURNAL));
//     if (correlation > 0.1 || correlation < -0.1) {
//         console.log(event + ":", correlation)
//     }
// }

// for (let entry of JOURNAL) {
//     if (entry.events.includes("peanuts") &&
//        !entry.events.includes("brushed teeth")) {
//         entry.events.push("peanut teeth")     //更改journal数组 将吃了坚果不刷牙的新建事件
//     }
// }
// console.log(phi(tableFor("peanut teeth", JOURNAL)))

// let todoList = []
// function remember(task) {
//     todoList.push(task)
// }
// function getTask() {
//     return todoList.shift()
// }
// function rememberUrgently(task) {
//     todoList.unshift(task)
// }

// console.log([1, 2, 3, 2, 1].indexOf(2))
// console.log([1, 2, 3, 2, 1].lastIndexOf(2))

// console.log([0, 1, 2, 3, 4].slice(2, 4))
// console.log([0, 1, 2, 3, 4].slice(2))

// function remove(array, index) {
//     return array.slice(0, index).concat(array.slice(index + 1))   //删除一个元算 前面接上后面
// }
// console.log(remove([1, 2, 3, 4, 5], 1))

// let sentence = "Secretarybirds specialize in stomping";
// let words = sentence.split(" ")
// console.log(words)
// console.log(words.join(" "))

// function max(key,...numbers){
//     let result = -Infinity
//     for (let number of numbers){
//         if(number > result) result = number
//     }
//     return result
// }
//
// console.log(max(1, 2, 3, 4))

// function randomPointOnCircle(radius) {
//     let angle = Math.random() * 2 * Math.PI
//     return {x: radius * Math.cos(angle),
//             y: radius * Math.sin(angle)}
// }
// console.log(randomPointOnCircle(2))
// console.log(Math.floor(Math.random() * 100))

let string = JSON.stringify({squirrel: false, events: ["weekend"]})
console.log(string)      //和普通一样  只不过类型是JSON
console.log(JSON.parse(string).events)