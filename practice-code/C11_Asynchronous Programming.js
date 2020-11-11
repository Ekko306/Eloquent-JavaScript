// // setTimeout(() => console.log("Tick"),500)
// //
var bigOak = require("./crow-tech").bigOak;
// // bigOak.readStorage("food caches", caches => {
// //     let firstCache = caches[2];
// //     bigOak.readStorage(firstCache, info =>{
// //         console.log(info)
// //     })
// // })
// //
//
var defineRequestType = require("./crow-tech").defineRequestType;
// // import defineRequestType from "./crow-tech"
//
// defineRequestType("note",
//
//     (nest, content, source, done) => {     //服务器端
//     console.log(`${nest.name} received note: ${content}`)
//     done(content)
//     return nest.name + content
// }
//
// )
//
// bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",   //客户端
//     (content,res) => console.log(content));
//

// function b(){
//     setTimeout(()=>{console.log('abc')},12300)
// }
// function a(){
//     console.log(123)
//     b()
//     return 1234
// }
//
// let c = a()
// console.log(c)


// var bigOak = require("./crow-tech").bigOak;
//
// let fifteen = Promise.resolve(15)
// fifteen.then(value => console.log(`Got ${value}`))



// function storage(nest, name) {
//     return new Promise(resolve => {   //立即调用这个函数
//         nest.readStorage(name, result => resolve(result))  //然后把这个函数交给处理异步结果
//     })
// }
//
// let a = storage(bigOak,"food caches").then(value => {
//     console.log("Got", value)
//     return 123
// })
//
// a.then(value => console.log(value))

// new Promise((_, reject) => reject(new Error("fail")))
// .then(value => console.log("Handler 1"))
// .catch(reason => {
//     console.log("Caught failure " + reason)
//     return "nothing"
// })
// .then(value => console.log("Handler 2", value))
//

// }
//
// //




var defineRequestType = require("./crow-tech").defineRequestType

function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
        try {
            Promise.resolve(handler(nest, content, source)).then(
                response => callback(null, response),
                failure => callback(failure)
            )
        } catch (exception) {
            callback(exception)
        }
    })
}
// requestType("note",(nest, content, source, done) => {     //服务器端
//     console.log(`${nest.name} received note: ${content}`)
// })


class Timeout extends Error {}
var bigOak = require("./crow-tech").bigOak;

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {    //有可能回调不会调用 就再发送 当然概率比较小
                done = true;
                if (failed) reject(failed)
                else resolve(value)
            })
            setTimeout(() => {
                if (done) return;
                else if (n < 3) attempt(n + 1);
                else reject(new Timeout("Timed out"))
            }, 250)
        }
        attempt(1)
    })
}

// request(bigOak, "Cow Pasture", "note", "Let's caw loudly at 7PM",()=>{console.log('abc')})
//     .then(()=>console.log('sss'))
//     .catch(()=>console.log('zzz'))



// requestType("ping", () => console.log("pong"))
// function availableNeighbors(nest) {
//     let requests = nest.neighbors.map(neighbor => {
//         return request(nest, neighbor, "ping")
//             .then(() => {return true},()=>false)
//     })
//     return Promise.all(requests).then(result => {
//         console.log(result)
//         return nest.neighbors.filter((_, i) => result[i])
//     })
// }
// let b = ['123']
// let a = availableNeighbors(bigOak).then(value=> {b = value})
//
// setTimeout(()=>console.log(b),1500)      //异步需要一定时间




// var everywhere = require('./crow-tech.js').everywhere
//
// everywhere(nest => {
//     nest.state.gossip = []
// })  //先把每个人巢穴变成空的（新建立一个数组）
//
//
// requestType("gossip", (nest, message, source, done) => {
//     if (nest.state.gossip.includes(message)) return;
//     console.log(`${nest.name} received gossip '${message}' from ${source}`)
//     return message        //这里回调替换成 return形式（之前 done(message)）
// })     //定义新的消息类型
//
// function sendGossip(nest, message, exceptFor = null) {
//     nest.state.gossip.push(message)
//     for (let neighbor of nest.neighbors) {
//         request(nest, neighbor, "gossip", message).then((response)=> console.log(response))   //这里加上response实验
//     }
// }
//
// sendGossip(bigOak, "kids with airgun in the park")



var everywhere = require('./crow-tech.js').everywhere
requestType("connections", (nest, {name, neighbors}, source) => {
    let connections = nest.state.connections
    let a = connections.get(name);
    if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return  //比较connections有没有邻居
    connections.set(name, neighbors)
    broadcastConnecctions(nest, name, source)   //具体咋相互传播图的 要根据crow-tech再回头看
})   //新增加一个connetions消息类型

function broadcastConnecctions(nest, name, exceptFor = null) {
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue
        request(nest, neighbor, "connections", {
            name,
            neighbors: nest.state.connections.get(name)
        })
    }
}

everywhere(nest => {  //每个节点执行这个操作 新建立一个图 把自己的信息放到图里面 然后传播到邻居里面去 如果图里面没有邻居
    nest.state.connections = new Map
    nest.state.connections.set(nest.name, nest.neighbors) //map的set 新增加键值对
    broadcastConnecctions(nest, nest.name)
})     //新加一个 应该是用来查找整一个 route 连接图
//
//
function findRoute(from, to, connections) {
    console.log(from + '=>' + to)
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
        let {at, via} = work[i];
        for (let next of connections.get(at) || []) {
            if (next == to) return via;
            if (!work.some(w => w.at == next)) {
                work.push({at: next, via: via || next});
            }
        }
    }
    return null;
}
//
function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
        return request(nest, target, type, content);
    } else {
        let via = findRoute(nest.name, target,
            nest.state.connections);
        if (!via) throw new Error(`No route to ${target}`);
        return request(nest, via, "route",
            {target, type, content});
    }
}
//
requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content);
});
// setTimeout(()=>{routeRequest(bigOak, "Church Tower", "note",
//     "Incoming jackdaws!")},1500)
//


//


function storage(nest, name) {
    return new Promise(resolve => {   //立即调用这个函数
        nest.readStorage(name, result => resolve(result))  //然后把这个函数交给处理异步结果
    })
}

requestType("storage", (nest, name) => storage(nest,name))
// function findInStorage(nest, name) {
//     return storage(nest, name).then(found => {
//         if(found != null) return found;
//         else return findInRemoteStorage(nest,name)
//     })
// }



// setTimeout(()=>{routeRequest(bigOak, "Church Tower", "storage",
//     "events on 2017-12-21").then(console.log)}, 1500)      //这里获取图需要一定时间 要等待

function network(nest) {
    return Array.from(nest.state.connections.keys())   //connections 是MAP对象 keys返回迭代器 可用Array.from转换成数组
}

// function findInRemoteStorage(nest, name) {
//     let sources = network(nest).filter(n => n != nest.name)    //返回一个迭代器 找到不是目的地的名字
//     function next() {
//         if(sources.length == 0) {
//             return Promise.reject(new Error("Not found"))
//         } else {
//             let source = sources[Math.floor(Math.random() * sources.length)]
//             sources = sources.filter(n => n!= source)
//             return routeRequest(nest, source, "storage", name)
//                 .then(value => value != null ? value : next(), next)
//         }
//     }
//     return next()
// }


//
async function findInStorage(nest, name) {
    let local = await storage(nest, name);
    if (local !=null) return local;

    let sources = network(nest).filter(n => n != nest.name)
    console.log(sources)
    while(sources.length > 0) {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter(n => n != source)
        try {
            let found = await routeRequest(nest, source, "storage", name);
            if(found != null) return found;
        } catch (_) {}
    }
    throw new Error("Not found")
}

// setTimeout(()=>{routeRequest(bigOak, "Church Tower", "storage",
//     "events on 2017-12-21").then(console.log)}, 1500)      //这里获取图需要一定时间 要等待

// setTimeout(()=>{findInStorage(bigOak, "events on 2017-12-21")
//     .then(value => console.log(value))},3000)


// function* powers(n) {
//     for (let current = n;; current *= n) {
//         yield current;
//     }
// }
//
// for (let power of powers(3)) {
//     if(power >50) break;
//     console.log(power)
// }
//
// Group.prototype[Symbol.iterator] = function*() {
//     for(let i = 0; i< this.members.length;i++){
//         yield this.members[i]
//     }
// }

//回调抓不到Error
// try {
//     setTimeout(() => {
//         throw new Error("Woosh")
//     }, 20);
// } catch (_) {
//     console.log("Caught!")
// }


//在事件循环中 慢的操作 会延迟其他事件的处理 时间循环不能等 会有问题
// let start = Date.now();
// setTimeout(() => {
//     console.log("Timeout ran at", Date.now() - start);
// }, 20);
// while (Date.now() < start + 50) {}
// console.log("Wasted time until", Date.now() - start);




// Promise.resolve("Done").then(console.log);
// console.log("Me first!");

function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
}

// async function chicks(nest, year) {
//     let list = "";
//     await Promise.all(network(nest).map(async name => {
//         list += `${name}: ${
//             await anyStorage(nest, name, `chicks in ${year}`)
//         }\n`;
//     }));
//     return list;
// }

async function chicks(nest, year) {
    let lines = network(nest).map(async name => {

        return name + ": " +
            await anyStorage(nest, name, `chicks in ${year}`);
    });
    return (await Promise.all(lines)).join("\n");
}


setTimeout(() => chicks(bigOak, 2017).then(console.log),1500)


