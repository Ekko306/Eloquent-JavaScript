// Exercises
require('./dependencies/crow-tech') //不全

// // 1⃣️
// // Tracking the scalpel
// // The village crows own an old scalpel that they occasionally use
// // on special missions—say, to cut through screen doors or packaging.
// // To be able to quickly track it down, every time the scalpel
// // is moved to another nest, an entry is added to the storage of both
// // the nest that had it and the nest that took it, under the name
// // "scalpel", with its new location as the value.
// //
// // This means that finding the scalpel is a matter of following the
// // breadcrumb trail of storage entries, until you find a nest where
// // that points at the nest itself.
// //
// // Write an async function locateScalpel that does this, starting
// // at the nest on which it runs. You can use the anyStorage function
// // defined earlier to access storage in arbitrary nests. The scalpel
// // has been going around long enough that you may assume that every
// // nest has a "scalpel" entry in its data storage.
// //
// // Next, write the same function again without using async and await.
// //
// // Do request failures properly show up as rejections of the returned promise in
// // both versions? How?
//
// async function locateScalpel(nest) {
//     let current = nest.name;
//     for (;;) {
//         let next = await anyStorage(nest, current, "scalpel");
//         if (next == current) return current;
//         current = next;
//     }
// }
//
// function locateScalpel2(nest) {
//     function loop(current) {
//         return anyStorage(nest, current, "scalpel").then(next => {
//             if (next == current) return current;
//             else return loop(next);
//         });
//     }
//     return loop(nest.name);
// }
//
// locateScalpel(bigOak).then(console.log);
// // → Butcher's Shop
// locateScalpel2(bigOak).then(console.log);
// // → Butcher's Shop


// // 2⃣️
// // Building Promise.all
// // Given an array of promises, Promise.all returns a promise that waits for all of
// // the promises in the array to finish. It then succeeds, yielding an array of result
// // values. If a promise in the array fails, the promise returned by all fails too,
// // with the failure reason from the failing promise.
// //
// // Implement something like this yourself as a regular function called Promise_all.
// //
// // Remember that after a promise has succeeded or failed, it can’t succeed or fail again,
// // and further calls to the functions that resolve it are ignored. This can simplify the
// // way you handle failure of your promise.
//
// function Promise_all(promises) {
//     return new Promise((resolve, reject) => {
//         let results = [];
//         let pending = promises.length;
//         for (let i = 0; i < promises.length; i++) {
//             promises[i].then(result => {
//                 results[i] = result;
//                 pending--;
//                 if (pending == 0) resolve(results);
//             }).catch(reject);
//         }
//         if (promises.length == 0) resolve(results);
//     });
// }
//
// // Test code.
// Promise_all([]).then(array => {
//     console.log("This should be []:", array);
// });
// function soon(val) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(val), Math.random() * 500);
//     });
// }
// Promise_all([soon(1), soon(2), soon(3)]).then(array => {
//     console.log("This should be [1, 2, 3]:", array);
// });
// Promise_all([soon(1), Promise.reject("X"), soon(3)]).then(array => {
//     console.log("We should not get here");
// }).catch(error => {
//     if (error != "X") {
//         console.log("Unexpected failure:", error);
//     }
// });
