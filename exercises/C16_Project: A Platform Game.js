Exercises


// // 1⃣️
// // Game over
// // It’s traditional for platform games to have the player start with a limited number of
// // lives and subtract one life each time they die. When the player is out of lives, the
// // game restarts from the beginning.
// //
// // Adjust runGame to implement lives. Have the player start with three. Output the current
// // number of lives (using console.log) every time a level starts.
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
//     <script src="code/levels.js"></script>
//
//     <link rel="stylesheet" href="css/game.css">
//
//     <body>
//     <script>
//     // The old runGame function. Modify it...
//     async function runGame(plans, Display) {
//         let lives = 3;
//         for (let level = 0; level < plans.length && lives > 0;) {
//             console.log(`Level ${level + 1}, lives: ${lives}`);
//             let status = await runLevel(new Level(plans[level]),
//                 Display);
//             if (status == "won") level++;
//             else lives--;
//         }
//         if (lives > 0) {
//             console.log("You've won!");
//         } else {
//             console.log("Game over");
//         }
//     }
// runGame(GAME_LEVELS, DOMDisplay);
// </script>
// </body>



// // 2⃣️
// // Pausing the game
// // Make it possible to pause (suspend) and unpause the game by pressing the Esc key.
// //
// // This can be done by changing the runLevel function to use another keyboard event
// // handler and interrupting or resuming the animation whenever the Esc key is hit.
// //
// // The runAnimation interface may not look like it is suitable for this at first glance,
// // but it is if you rearrange the way runLevel calls it.
// //
// // When you have that working, there is something else you could try. The way we have
// // been registering keyboard event handlers is somewhat problematic. The arrowKeys
// // object is currently a global binding, and its event handlers are kept around even
// // when no game is running. You could say they leak out of our system. Extend trackKeys
// // to provide a way to unregister its handlers and then change runLevel to register its
// // handlers when it starts and unregister them again when it is finished.
//
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
//     <script src="code/levels.js"></script>
//
//     <link rel="stylesheet" href="css/game.css">
//
//     <body>
//     <script>
//     // To know when to stop and restart the animation, a level that is
//     // being displayed may be in three `running` states:
//     //
//     // * "yes":     Running normally.
//     // * "no":      Paused, animation isn't running
//     // * "pausing": Must pause, but animation is still running
//     //
//     // The key handler, when it notices escape being pressed, will do a
//     // different thing depending on the current state. When running is
//     // "yes" or "pausing", it will switch to the other of those two
//     // states. When it is "no", it will restart the animation and switch
//     // the state to "yes".
//     //
//     // The animation function, when state is "pausing", will set the state
//     // to "no" and return false to stop the animation.
//
//     function runLevel(level, Display) {
//         let display = new Display(document.body, level);
//         let state = State.start(level);
//         let ending = 1;
//         let running = "yes";
//
//         return new Promise(resolve => {
//             function escHandler(event) {
//                 if (event.key != "Escape") return;
//                 event.preventDefault();
//                 if (running == "no") {
//                     running = "yes";
//                     runAnimation(frame);
//                 } else if (running == "yes") {
//                     running = "pausing";
//                 } else {
//                     running = "yes";
//                 }
//             }
//             window.addEventListener("keydown", escHandler);
//             let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
//
//             function frame(time) {
//                 if (running == "pausing") {
//                     running = "no";
//                     return false;
//                 }
//
//                 state = state.update(time, arrowKeys);
//                 display.syncState(state);
//                 if (state.status == "playing") {
//                     return true;
//                 } else if (ending > 0) {
//                     ending -= time;
//                     return true;
//                 } else {
//                     display.clear();
//                     window.removeEventListener("keydown", escHandler);
//                     arrowKeys.unregister();
//                     resolve(state.status);
//                     return false;
//                 }
//             }
//             runAnimation(frame);
//         });
//     }
//
// function trackKeys(keys) {
//     let down = Object.create(null);
//     function track(event) {
//         if (keys.includes(event.key)) {
//             down[event.key] = event.type == "keydown";
//             event.preventDefault();
//         }
//     }
//     window.addEventListener("keydown", track);
//     window.addEventListener("keyup", track);
//     down.unregister = () => {
//         window.removeEventListener("keydown", track);
//         window.removeEventListener("keyup", track);
//     };
//     return down;
// }
//
// runGame(GAME_LEVELS, DOMDisplay);
// </script>
// </body>


// // 3⃣️
// // A monster
// // It is traditional for platform games to have enemies that you can jump on top of
// // to defeat. This exercise asks you to add such an actor type to the game.
// //
// // We’ll call it a monster. Monsters move only horizontally. You can make them move
// // in the direction of the player, bounce back and forth like horizontal lava, or
// // have any movement pattern you want. The class doesn’t have to handle falling,
// // but it should make sure the monster doesn’t walk through walls.
// //
// // When a monster touches the player, the effect depends on whether the player is
// // jumping on top of them or not. You can approximate this by checking whether the
// // player’s bottom is near the monster’s top. If this is the case, the monster
// // disappears. If not, the game is lost.
//
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
//     <script src="code/levels.js"></script>
//
//     <link rel="stylesheet" href="css/game.css">
//
//     <style>
// .monster { background: purple }
// </style>
//
// <body>
// <script>
// const monsterSpeed = 4;
//
// class Monster {
//     constructor(pos) { this.pos = pos; }
//
//     get type() { return "monster"; }
//
//     static create(pos) { return new Monster(pos.plus(new Vec(0, -1))); }
//
//     update(time, state) {
//         let player = state.player;
//         let speed = (player.pos.x < this.pos.x ? -1 : 1) * time * monsterSpeed;
//         let newPos = new Vec(this.pos.x + speed, this.pos.y);
//         if (state.level.touches(newPos, this.size, "wall")) return this;
//         else return new Monster(newPos);
//     }
//
//     collide(state) {
//         let player = state.player;
//         if (player.pos.y + player.size.y < this.pos.y + 0.5) {
//             let filtered = state.actors.filter(a => a != this);
//             return new State(state.level, filtered, state.status);
//         } else {
//             return new State(state.level, state.actors, "lost");
//         }
//     }
// }
//
// Monster.prototype.size = new Vec(1.2, 2);
//
// levelChars["M"] = Monster;
//
// runLevel(new Level(`
// ..................................
// .################################.
// .#..............................#.
// .#..............................#.
// .#..............................#.
// .#...........................o..#.
// .#..@...........................#.
// .##########..............########.
// ..........#..o..o..o..o..#........
// ..........#...........M..#........
// ..........################........
// ..................................
// `), DOMDisplay);
// </script>
// </body>
