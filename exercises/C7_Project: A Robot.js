// Exercises
require('./dependencies/07_robot.js')
require('./dependencies/animatevillage.js')
// 必须浏览器环境

// // 1⃣️
// // Measuring a robot
// // It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks or the kind of tasks that it is good at, whereas the other didn’t.
// //
// //Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.
// //
// //For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.
// function countSteps(state, robot, memory) {
//     for (let steps =0;;steps++) {
//         if(state.parcels.length === 0) return steps;
//         let action = robot(state, memory);
//         state = state.move(action.direction)
//         memory = action.memory;
//     }
// }
//
// function compareRobots(robot1, memory1, robot2, memory2) {
//     let total1 = 0, total2 = 0;
//     for (let i = 0; i < 100; i++) {
//         let state = VillageState.random();
//         total1 += countSteps(state, robot1, memory1);
//         total2 += countSteps(state, robot2, memory2);
//     }
//     console.log(`Robot 1 needed ${total1 / 100} steps per task`)
//     console.log(`Robot 2 needed ${total2 / 100}`)
// }
//
// compareRobots(routeRobot, [], goalOrientedRobot, []);


// // 2⃣️
// // Robot efficiency
// // Can you write a robot that finishes the delivery task faster
// // than goalOrientedRobot? If you observe that robot’s behavior,
// // what obviously stupid things does it do? How could those be
// // improved?
// //
// // If you solved the previous exercise, you might want to use your
// // compareRobots function to verify whether you improved the robot.
//
// function lazyRobot({place, parcels}, route) {
//     if (route.length == 0) {
//         // Describe a route for every parcel
//         let routes = parcels.map(parcel => {
//             if (parcel.place != place) {
//                 return {route: findRoute(roadGraph, place, parcel.place),
//                     pickUp: true};
//             } else {
//                 return {route: findRoute(roadGraph, place, parcel.address),
//                     pickUp: false};
//             }
//         });
//
//         // This determines the precedence a route gets when choosing.
//         // Route length counts negatively, routes that pick up a package
//         // get a small bonus.
//         function score({route, pickUp}) {
//             return (pickUp ? 0.5 : 0) - route.length;
//         }
//         route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
//     }
//
//     return {direction: route[0], memory: route.slice(1)};
// }
//
// runRobotAnimation(VillageState.random(), lazyRobot, []);



// // 3⃣️
// // Persistent group
// // Most data structures provided in a standard JavaScript environment aren’t very
// // well suited for persistent use. Arrays have slice and concat methods, which allow
// // us to easily create new arrays without damaging the old one. But Set, for example,
// // has no methods for creating a new set with an item added or removed.
// //
// // Write a new class PGroup, similar to the Group class from Chapter 6, which stores
// // a set of values. Like Group, it has add, delete, and has methods.
// //
// // Its add method, however, should return a new PGroup instance with the given member
// // added and leave the old one unchanged. Similarly, delete creates a new instance
// // without a given member.
// //
// // The class should work for values of any type, not just strings. It does not have
// // to be efficient when used with large amounts of values.
// //
// // The constructor shouldn’t be part of the class’s interface (though you’ll definitely
// // want to use it internally). Instead, there is an empty instance, PGroup.empty,
// // that can be used as a starting value.
// //
// // Why do you need only one PGroup.empty value, rather than having a function that
// // creates a new, empty map every time?
//
// class PGroup {
//     constructor(members) {
//         this.members = members;
//     }
//
//     add(value) {
//         if (this.has(value)) return this;
//         return new PGroup(this.members.concat([value]));
//     }
//
//     delete(value) {
//         if (!this.has(value)) return this;
//         return new PGroup(this.members.filter(m => m !== value));
//     }
//
//     has(value) {
//         return this.members.includes(value);
//     }
// }
//
// PGroup.empty = new PGroup([]);
//
// let a = PGroup.empty.add("a");
// let ab = a.add("b");
// let b = ab.delete("a");
//
// console.log(b.has("b"));
// // → true
// console.log(a.has("b"));
// // → false
// console.log(b.has("a"));
// // → false
