// Exercises

// // 1⃣️
// // Shapes
// // Write a program that draws the following shapes on a canvas:
// //
// // A trapezoid (a rectangle that is wider on one side)
// //
// // A red diamond (a rectangle rotated 45 degrees or ¼π radians)
// //
// // A zigzagging line
// //
// // A spiral made up of 100 straight line segments
// //
// // A yellow star
// //
// // The shapes to draw
// // When drawing the last two, you may want to refer to the explanation of Math.cos
// // and Math.sin in Chapter 14, which describes how to get coordinates on a circle using
// // these functions.
// //
// // I recommend creating a function for each shape. Pass the position, and optionally
// // other properties such as the size or the number of points, as parameters. The
// // alternative, which is to hard-code numbers all over your code, tends to make the
// // code needlessly hard to read and modify.
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
//     <script src="code/levels.js"></script>
//     <script src="code/chapter/17_canvas.js"></script>
//
//     <canvas width="600" height="200"></canvas>
//     <script>
//     let cx = document.querySelector("canvas").getContext("2d");
//
// function trapezoid(x, y) {
//     cx.beginPath();
//     cx.moveTo(x, y);
//     cx.lineTo(x + 50, y);
//     cx.lineTo(x + 70, y + 50);
//     cx.lineTo(x - 20, y + 50);
//     cx.closePath();
//     cx.stroke();
// }
// trapezoid(30, 30);
//
// function diamond(x, y) {
//     cx.translate(x + 30, y + 30);
//     cx.rotate(Math.PI / 4);
//     cx.fillStyle = "red";
//     cx.fillRect(-30, -30, 60, 60);
//     cx.resetTransform();
// }
// diamond(140, 30);
//
// function zigzag(x, y) {
//     cx.beginPath();
//     cx.moveTo(x, y);
//     for (let i = 0; i < 8; i++) {
//         cx.lineTo(x + 80, y + i * 8 + 4);
//         cx.lineTo(x, y + i * 8 + 8);
//     }
//     cx.stroke();
// }
// zigzag(240, 20);
//
// function spiral(x, y) {
//     let radius = 50, xCenter = x + radius, yCenter = y + radius;
//     cx.beginPath();
//     cx.moveTo(xCenter, yCenter);
//     for (let i = 0; i < 300; i++) {
//         let angle = i * Math.PI / 30;
//         let dist = radius * i / 300;
//         cx.lineTo(xCenter + Math.cos(angle) * dist,
//             yCenter + Math.sin(angle) * dist);
//     }
//     cx.stroke();
// }
// spiral(340, 20);
//
// function star(x, y) {
//     let radius = 50, xCenter = x + radius, yCenter = y + radius;
//     cx.beginPath();
//     cx.moveTo(xCenter + radius, yCenter);
//     for (let i = 1; i <= 8; i++) {
//         let angle = i * Math.PI / 4;
//         cx.quadraticCurveTo(xCenter, yCenter,
//             xCenter + Math.cos(angle) * radius,
//             yCenter + Math.sin(angle) * radius);
//     }
//     cx.fillStyle = "gold";
//     cx.fill();
// }
// star(440, 20);
// </script>



// // 2⃣️
// // The pie chart
// // Earlier in the chapter, we saw an example program that drew a pie chart.
// // Modify this program so that the name of each category is shown next to the
// // slice that represents it. Try to find a pleasing-looking way to automatically
// // position this text that would work for other data sets as well. You may assume
// // that categories are big enough to leave ample room for their labels.
// //
// // You might need Math.sin and Math.cos again, which are described in Chapter 14.
//
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
//     <script src="code/levels.js"></script>
//     <script src="code/chapter/17_canvas.js"></script>
//
//     <canvas width="600" height="300"></canvas>
//     <script>
//     let cx = document.querySelector("canvas").getContext("2d");
// let total = results.reduce(function(sum, choice) {
//     return sum + choice.count;
// }, 0);
//
// let currentAngle = -0.5 * Math.PI;
// let centerX = 300, centerY = 150;
//
// results.forEach(function(result) {
//     let sliceAngle = (result.count / total) * 2 * Math.PI;
//     cx.beginPath();
//     cx.arc(centerX, centerY, 100,
//         currentAngle, currentAngle + sliceAngle);
//
//     let middleAngle = currentAngle + 0.5 * sliceAngle;
//     let textX = Math.cos(middleAngle) * 120 + centerX;
//     let textY = Math.sin(middleAngle) * 120 + centerY;
//     cx.textBaseLine = "middle";
//     if (Math.cos(middleAngle) > 0) {
//         cx.textAlign = "left";
//     } else {
//         cx.textAlign = "right";
//     }
//     cx.font = "15px sans-serif";
//     cx.fillStyle = "black";
//     cx.fillText(result.name, textX, textY);
//
//     currentAngle += sliceAngle;
//     cx.lineTo(centerX, centerY);
//     cx.fillStyle = result.color;
//     cx.fill();
// });
// </script>


// // 3⃣️
// // A bouncing ball
// // Use the requestAnimationFrame technique that we saw in Chapter 14 and Chapter
// // 16 to draw a box with a bouncing ball in it. The ball moves at a constant speed
// // and bounces off the box’s sides when it hits them.
// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
//     <script src="code/levels.js"></script>
//     <script src="code/chapter/17_canvas.js"></script>
//
//     <canvas width="400" height="400"></canvas>
//     <script>
//     let cx = document.querySelector("canvas").getContext("2d");
//
// let lastTime = null;
// function frame(time) {
//     if (lastTime != null) {
//         updateAnimation(Math.min(100, time - lastTime) / 1000);
//     }
//     lastTime = time;
//     requestAnimationFrame(frame);
// }
// requestAnimationFrame(frame);
//
// let x = 100, y = 300;
// let radius = 10;
// let speedX = 100, speedY = 60;
//
// function updateAnimation(step) {
//     cx.clearRect(0, 0, 400, 400);
//     cx.strokeStyle = "blue";
//     cx.lineWidth = 4;
//     cx.strokeRect(25, 25, 350, 350);
//
//     x += step * speedX;
//     y += step * speedY;
//     if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
//     if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
//     cx.fillStyle = "red";
//     cx.beginPath();
//     cx.arc(x, y, radius, 0, 7);
//     cx.fill();
// }
// </script>


// // 4⃣️
// // Precomputed mirroring
// // One unfortunate thing about transformations is that they slow down the drawing of
// // bitmaps. The position and size of each pixel has to be transformed, and though it
// // is possible that browsers will get cleverer about transformation in the future,
// // they currently cause a measurable increase in the time it takes to draw a bitmap.
// //
// // In a game like ours, where we are drawing only a single transformed sprite, this
// // is a nonissue. But imagine that we need to draw hundreds of characters or
// // thousands of rotating particles from an explosion.
// //
// // Think of a way to allow us to draw an inverted character without loading additional
// // image files and without having to make transformed drawImage calls every frame.
