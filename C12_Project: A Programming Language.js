function skipSpace(string) {
    let first = string.search(/\S/)    //查找非空格的部分
    if(first == -1) return "";    //没找到非空格部分 就返回空的（错的）
    return string.slice(first)   //找到非空格部分（字母数字啥的），slice first是找到的第一个空额 跳过空格
}

function parseExpression(program) {    //解析表达式 查找一段化每个东西是什么东西+-> apply   a->value   10->value
    program = skipSpace(program)
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {    //查找某一种 查到就返回一个 具体debug
        expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) {
        expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = {type: "word", name: match[0]};
    } else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }
    return parseApply(expr, program.slice(match[0].length))
}

function parseApply(expr, program) {      //这个用来塞到对象结构体里
    program = skipSpace(program)
    if (program[0] != "(") {     //这里拦住 只有+后面跟一个(才会是新的apply
        return {expr: expr, rest: program}
    }
    //是application可以解析表达式
    program = skipSpace(program.slice(1))
    expr = {type: "apply", operator: expr, args: []}      //这里说的 可能重复有()()
    while (program[0] != ")") {
        let arg = parseExpression(program)
        expr.args.push(arg.expr)
        program = skipSpace(arg.rest)
        if (program[0] == ",") {
            program = skipSpace(program.slice(1))
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'")
        }
    }
    return parseApply(expr, program.slice(1))
}

function parse(program) {
    let {expr, rest} = parseExpression(program)
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program")
    }
    return expr
}

// console.log(parse("+(a,10)"))

const specialForms = Object.create(null);
function evaluate(expr, scope){   //评价每一个花括号 程序是一段段花括号组成的
    if(expr.type == "value") {
        return expr.value
    } else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(
                `Undefined binding: ${expr.name}`
            )
        }
    } else if(expr.type == "apply") {  //区分操作
        let {operator, args} =expr;
        if (operator.type == "word" && operator.name in specialForms) {      //这种是if while这些逻辑关键字 直接往后传递
            return specialForms[operator.name](expr.args, scope)
        } else {      //运算操作是函数 + 这种什么函数 调用起来 把参数传入进去
            let op =evaluate(operator, scope);
            if(typeof op == "function") {
                return op(...args.map(arg => evaluate(arg, scope)))
            } else {
                throw new TypeError("Applying a non-function")
            }
        }
    }
}

specialForms.if = (args, scope) => {      //if是个箭头函数
    if (args.length != 3) {     //if表达式必须要有 3个 参数
        throw new SyntaxError("Wrong number of args to if");
    } else if(evaluate(args[0], scope) === true) {
        return evaluate(args[1], scope)
    } else {
        return evaluate(args[2], scope)
    }
}

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while")
    }
    while (evaluate(args[0], scope) === true) {
        evaluate(args[1], scope)
    }
    //蛋语言没有undefined 当缺少有意义的结果 返回undefined
    return false
}

specialForms.do = (args, scope) => {
    let value = false
    for (let arg of args) {
        value = evaluate(arg, scope)
    }
    return value
}

specialForms.define = (args, scope) => {    //这个是定义绑定 将plusone = funciton（） 这个函数进行加一的操作
    if(args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of deined")
    }
    let value = evaluate(args[1], scope)
    scope[args[0].name] = value //添加到scope里面加上新变量和值
    return value
}

const topScope = Object.create(null)
topScope.true = true
topScope.false = false

// let prog = parse(`if(true, false, true)`)
// console.log(evaluate(prog, topScope))

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b",`return a ${op} b`)
}

topScope.print = value => {
    console.log(value)
    return value
}

function run(program) {
    return evaluate(parse(program), Object.create(topScope))
}

// run(`
// do(define(total, 0),
//    define(count, 1),
//    while(<(count, 11),
//          do(define(total, +(total, count)),print(total),
//             define(count, +(count, 1)))))
// `);

specialForms.fun = (args, scope) => {        //这个是返回函数 有个奇怪的鬼东西
    if (!args.length) { //如果参数长度为0 肯定错的
        throw new SyntaxError("Funtions need a body")
    }
    let body = args[args.length - 1] //最后一个参数 0开始数减1
    let params = args.slice(0, args.length -1).map(expr => {
        if(expr.type != "word") {
            throw new SyntaxError("Parameter names must be words")
        }
        return expr.name //返回参数
    })

    return function() {  //
        if(arguments.length != params.length) {     //arguments什么鬼
            throw new TypeError("Wrong number of arguments")
        }
        let localScope = Object.create(scope);
        for (let i=0; i< arguments.length; i++) {
            localScope[params[i]] = arguments[i]
        }
        return evaluate(body, localScope)     //前面只是说明了参数a b 和返回一个 body还是一个对象 到真正执行的时候再进行evaluate再解析执行+(a, 1)
    }
}

console.log(123)
console.log(parse("do(define(plusOne, fun(a, +(a, 1))),\n   print(plusOne(10)))"))
run(`
do(define(plusOne, fun(a,b, +(a, b))),
   print(plusOne(10,20)))
`);