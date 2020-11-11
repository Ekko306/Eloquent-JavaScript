// ***[Higher-order functions]***
// 创建新函数
// function greaterThan(n) {
//     return m => m > n
// }
// let greaterThan10 = greaterThan(10);    //新建一个 大于10 函数 定义是n 再传入是m
// console.log(greaterThan10(9))

// 改变其他函数
// function noisy(f) {
//     return (...args) => {
//         console.log("calling with", args);
//         let result = f(...args);           //改变了Math.min函数 先打印包含对象
//         console.log("called with", args, ", returned", result);
//         return result;
//     }
// }
// noisy(Math.min)(3,2,1)

// 提供控制流的函数
// function repeat(n, action) {
//     for (let i = 0; i < n; i++) {
//         action(i)
//     }
// }
//
// function unless(test, then) {
//     if (!test) then();
// }

// repeat(3, n => {
//     unless(n % 2 == 1, () => {
//         console.log(n, "is even")
//     })
// })
//
// const clas = ["A", "B"]
// clas.forEach(l => console.log(l))



// ***[Script data set]***
// require('./scripts.js')
// function filter(array, test){
//     let passed =[]
//     for (let element of array) {
//         if(test(element)) {
//             passed.push(element)
//         }
//     }
//     return passed
// }
// console.log(filter(SCRIPTS, script => script.living))
// console.log(SCRIPTS.filter(s => s.direction == "ttb"))




// ***[Transforming with map]***
function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped
}
let rtlScripts = SCRIPTS.filter(s=> s.direction == "rtl")
console.log(map(rtlScripts, s=>s.name))
console.log(rtlScripts)

// function reduce(array, combine, start){
//     let current = start;
//     for( let element of array) {
//         current = combine(current, element)
//     }
//     return current
// }
// console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0))
// console.log([1, 2, 3, 4].reduce((a, b)=> a+b,))

// console.log([1, 2, 3, 4].reduce((a, b)=> {
//     return a > b ? a : b
// }))     //深入理解

// function characterCount(script) {
//     return script.ranges.reduce((count, [from, to])=> {
//         return count + (to - from)
//     }, 0)
// }
//
// console.log(SCRIPTS.reduce((a, b)=> {
//     return characterCount(a)<characterCount(b) ? b: a
// }))

// function average(array) {
//     return array.reduce((a, b) => a + b) / array.length
// }
// console.log(Math.round(average(
//     SCRIPTS.filter(s => s.living).map(s => s.year)
// )))
// console.log(Math.round(average(
//     SCRIPTS.filter(s => !s.living).map(s => s.year)
// )))
//
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to
        })) {
            return script   //return就结束函数了
        }
    }
    return null
}

// console.log(characterScript(121))

// Two emoji characters, horse and shoe
// let horseShoe = "🐴👟";
// console.log(horseShoe.length);
// console.log(horseShoe[0]);
// console.log(horseShoe.charCodeAt(0));
// console.log(horseShoe.codePointAt(0));

// let roseDragon = "🌹🐉🐴👟";
// for (let char of roseDragon) {
//     console.log(char);
// }

function countBy(items, groupName) {
    let counts = []
    for (let item of items) {
        let name = groupName(item)
        let known = counts.findIndex(c => c.name == name)   //c是数组成员 c.name就是成员的name属性
        if (known == -1) {
            counts.push({name, count: 1})
        } else {
            counts[known].count++
        }
    }
    return counts;
}

// console.log(countBy([1, 2, 3, 4, 5], n => n>2))

function textScripts(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.name : "none";
    }).filter(({name}) => name != "none")
    let total = scripts.reduce((n, {count}) => n + count, 0)
    if (total == 0) return "No scripts found";

    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ")
}


console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'))