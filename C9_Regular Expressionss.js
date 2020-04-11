// let re1 = new RegExp("abc")
// let re2 = /abc/
//
// let eighteenPlus = /eighteen\+/

// console.log(/abc/.test("abcde"))
// console.log(/abc/.test("abxde"))

// console.log(/[0123456789]/.test("in 1992"))
// console.log(/[0-9]/.test("in 1992"))

// let dataTime = /\d\d-\d\d-\d\d\d\d\s\d\d:\d\d/
// console.log(dataTime.test("01-30-2003 15:20"))

// let notBinary  = /[^01]/ //0或者1
// console.log(notBinary.test("1100100010100110"))
// console.log(notBinary.test("1100100010200110"))

// console.log(/'\d+'/.test("'123'"))
// console.log(/'\d+'/.test("''"))   // >=1
// console.log(/'\d*'/.test("123"))
// console.log(/'\d*'/.test("''"))   // >=0

// let neighbor = /neighbou?r/ //u可以0或1次
// console.log(neighbor.test("neighbour"))
// console.log(neighbor.test("neighbor"))

// let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
// console.log(dateTime.test("1-30-2003 8:45"))

// let cartoonCrying = /boo+(hoo+)+/i
// console.log(cartoonCrying.test("Boohoooohoohooo"))
//
// let match = /\d+/.exec("one two 100")
// console.log(match)
// console.log(match.index)
//
// console.log("one tw200o 1001 200".match(/\d+/))
// console.log("one tw200o 1001 200".match(/\d+/g))

//
// console.log(/bad(ly)?/.exec("bad"))
// console.log(/(\d)+/.exec("1231235499"))

// console.log(new Date())
// console.log(new Date(2009, 11, 9))
// console.log(new Date(2009, 11, 12, 59, 59, 999))

// console.log(new Date().getTime())  //Date.now()
// console.log(new Date(1582426055655))


// function getDate(string) {   //传入字符串 返回date数组
//     let [_, month, day, year] =
//         /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string)
//     return new Date(year, month - 1, day)
// }
//
// console.log(getDate("1-39-2003"))
//
// console.log(/cat/.test("concatenate"))
// console.log(/\bcat\b/.test("concatenate"))

// let animalCount = /\b\d+ (pig|cow|chicken)s?\b/    //s 一个或没有
// console.log(animalCount.test("the 15 pigs"))
// console.log(animalCount.test("15 pigchickens"))

// console.log(/\b[01]+b|[\da-f]+h|\d+\b/g.exec("12b 01b aeh 13"))     //g只对replace有用 exec只找第一个

// console.log(/([01]+)+b/.exec("0101090801011111011000 123123b 01b"))
// console.log("papa".replace("p", "m"))
// console.log("Borobudur".replace(/[ou]/, "a"))  //[ou] o或者u
// console.log("Borobudur".replace(/[ou]/g, "a"))
// let text = "rskov, Barbara\nMcCarthy, John\nWadler, Philip"
// let a = text.match(/(\w+), (\w+)/).groups //报错 必须给groups命名
// console.log("rskov, Barbara\nMcCarthy, John\nWadler, Philip".match(/(\w+), (\w+)/g))
// console.log(
//     "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
//         .replace(/(\w+), (\w+)/g, "$2 $1"));

// let s = "the cia and fbi"
// console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase())) //用整个匹配的

// let stock = "1 lemon, 2 cabbages, and 101 eggs"
// function minusOne(match, amount, unit){  //match没有用
//     amount = Number(amount) - 1;
//     if (amount === 1) {
//         unit = unit.slice(0, unit.length - 1)
//     } else if (amount === 0) {
//         amount = "no"
//     }
//     // console.log(match)
//     console.log(unit)
//     return amount + " " + unit;
// }
// console.log(stock.replace(/(\d+) (\w+)/g, minusOne))

// function stripComments(code) {
//     return code.replace(/\/\/.*|\/\*[^]*\*\//g, "")
// }
// console.log(stripComments("1 + /* 2 */3"))
// console.log(stripComments("x = 10; //ten!"))
// console.log(stripComments("1 /* a */+/* b */ 1"))
//贪婪
// function stripComments(code) {
//     return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
// }
// console.log(stripComments("1 /* a */+/* b */ 1"));

// let name = "harry"  //找harry这个人
// let text = "Harry is a suspicious Harry character. " //Harry和其他一样很难提前知道
// let regexp = new RegExp("\\b(" + name + ")\\b", "gi") //可能有任意多个空格
// console.log(text.replace(regexp, "_$1_"))


//
// let name = "dea+hl[]rd"
// let text = "This dea+hl[]rd guy is super annoying."   //哦哦 要匹配的 东西有+和[]这些被看成正则表达式了
// let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&")
// console.log(escaped)
// let regexp = new RegExp("\\b(" + escaped + ")\\b", "gi") //可能有任意多个空格
// console.log(text.replace(regexp, "_$&_"))
// console.log(text.replace(regexp, "_$1_"))
// //
// console.log("  word".search(/\S/))
// console.log("    ".search(/\S/))

// let pattern = /y/g
// pattern.lastIndex = 3
// let match = pattern.exec("xyzzy")
// console.log(match.index)
// console.log(pattern.lastIndex)

// let global = /abc/g
// console.log(global.exec("xyz abc"))
// let sticky = /abc/y
// console.log(sticky.exec("xyz abc"))

// let digit = /\d/g
// console.log(digit.exec("here it is: 1"))
// console.log(digit.exec("and now: 1"))

// let input = "A string with 3 numbers in it... 42 and 88."
// number = /\b\d+\b/g
// let match
// while (match = number.exec(input)) {
//     console.log("Found", match[0], "at", match.index)
// }
//
// console.log(/\r?\n/.exec("\r\n"))
//
// function parseINI(string) {
//     // Start with an object to hold the top-level fields
//     let result = {};
//     let section = result;
//     string.split(/\r?\n/).forEach(line => {  //把每一行分开
//         let match;
//         if (match = line.match(/^(\w+)=(.*)$/)) {  //匹配name=Vasilis match[1]是=前 match[2]是=后
//             section[match[1]] = match[2];  //塞到对象里
//         } else if (match = line.match(/^\[(.*)\]$/)) { //匹配括号 match[1]是括号内内容
//             section = result[match[1]] = {}; //连等 section为空，result[match[1]]为空 这个真神奇
//             // 把result[match[1]]指针指向section section改变了result[match[1]]也改变了
//         } else if (!/^\s*(;.*)?$/.test(line)) {  //没有匹配到多个空格或者注释 就会报错 只可能有者三种可能性
//             throw new Error("Line '" + line + "' is not valid.");
//         }
//     });
//     return result;
// }
// console.log(parseINI(`
// name=Vasilis
// [address]
// city=Tessaloniki`))

// console.log(/🍎{3}/.test("🍎🍎🍎"));
// console.log(/<.>/.test("<🌹>"));
// console.log(/<.>/u.test("<🌹>"));   //用u

console.log(/\p{Script=Greek}/u.test("α"));
console.log(/\p{Script=Arabic}/u.test("α"));
console.log(/\p{Alphabetic}/u.test("α"));
console.log(/\p{Alphabetic}/u.test("!"));