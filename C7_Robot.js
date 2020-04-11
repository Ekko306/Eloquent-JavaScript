const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null)    //空对象无原型
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to]
        } else {
            graph[from].push(to)
        }
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to)
        addEdge(to, from)
    }
    return graph
}

const roadGraph = buildGraph(roads)

// console.log(roadGraph)

class VillageState {    //到一个点 该做啥
    constructor(place, parcels) {
        this.place = place
        this.parcels = parcels
    }
    move(destination) {
        if(!roadGraph[this.place].includes(destination)){
            return this
        } else {
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) return p    //这个包裹是plcae是起点 address是终点 如果现在位置不等于起点 不拿起 否则拿起到下一步更新到目的地
                return {place: destination, address: p.address}  // 给拿到的包裹更新现在place
            }).filter(p => p.place != p.address)  //检查包裹 有现在place == 目的地 放在不要
            return new VillageState(destination, parcels)
        }
    }
}

let first = new VillageState(
    "Post Office",
    [{place:"Post Office", address: "Alice's House"}]
)
let next = first.move("Alice's House")
// console.log(next)




function runRobot(state, robot, memory) {    //先没有用到memory
    for (let turn =0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`)
            break;
        }
        let action =robot(state, memory)  //memory传入了无用参数
        state = state.move(action.direction)
        memory = action.memory
        console.log(`Moved to ${action.direction}`)
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length)
    return array[choice]
}
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])}
}

VillageState.random = function (parcelCount = 5) {
    let parcels = []
    for (let i = 0; i< parcelCount ; i++){
        let address = randomPick(Object.keys(roadGraph))
        let place;
        do {
            place = randomPick(Object.keys(roadGraph))
        } while(place == address){  //当满足place==address 执上面的（重新拿） 不满足执行下面的结束条件防重复
            parcels.push({place, address})
        }
    }
    return new VillageState("Post Office", parcels)
}

// runRobot(VillageState.random(), randomRobot)   //随机机器人版本

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
]

function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)}
}

// runRobot(VillageState.random(), routeRobot, mailRoute.reverse())    //路线机器人版本

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {//找起点连接的位置
            if (place === to) return route.concat(place); //如果at的下一点是终点，返回返回包含终点的路线
            if (work.some(w => w.at !== place)) { //这里没有找到，就把连接起始点的一条路径添加到work
                // 尼玛是一条恒true的没用 上面找不到，再遍历路线肯定找不到呀 at就是place要找的 还看半天
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length === 0) {    //memory===route 记忆就是route，就是有路线按照路线去走，没路线就生成路线
        let parcel = parcels[0];
        if (parcel.place != place) { //如果位置不再第一包裹起点 去起点 找去起点的路
            route = findRoute(roadGraph, place, parcel.place);    //地图/起点/终点
        } else { //否则在第一包裹期待你 去重点
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};   //去除起点1
}


runRobot(VillageState.random(), goalOrientedRobot, [])    //路线机器人版本