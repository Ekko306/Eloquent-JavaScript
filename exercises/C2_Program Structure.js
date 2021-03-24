// Exercises

// If you are unsure how to test your solutions to the exercises, refer to the Introduction.
//
// Each exercise starts with a problem description. Read this description and try to solve the exercise.
// If you run into problems, consider reading the hints after the exercise. Full solutions to the exercises
// are not included in this book, but you can find them online at https://eloquentjavascript.net/code.
// If you want to learn something from the exercises, I recommend looking at the solutions only after
// you’ve solved the exercise, or at least after you’ve attacked it long and hard enough to have a
// slight headache.


// // 1⃣️
// // Looping a triangle
// // Write a loop that makes seven calls to console.log to output the following triangle:
// // #
// // ##
// // ###
// // ####
// // #####
// // ######
// // #######
//
// // It may be useful to know that you can find the length of a string by writing .length after it.
//
// let abc = "abc";
// console.log(abc.length);
//
// // Most exercises contain a piece of code that you can modify to solve the exercise.
// // Remember that you can click code blocks to edit them.
//
// for (let line = "#"; line.length < 8; line += "#")
//     console.log(line);


// // 2⃣️
// // FizzBuzz
// // Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions.
// // For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3),
// // print "Buzz" instead.
// //
// // When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible
// // by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
// //
// // (This is actually an interview question that has been claimed to weed out a significant
// // percentage of programmer candidates. So if you solved it, your labor market value just went up.)
//
// for (let n = 1; n <= 100; n++) {
//     let output = "";
//     if (n % 3 == 0) output += "Fizz";
//     if (n % 5 == 0) output += "Buzz";
//     console.log(output || n);
// }


// // 3⃣️
// // Chessboard
// // Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines.
// // At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.
// //
// // Passing this string to console.log should show something like this:
//
// // # # # #
// // # # # #
// // # # # #
// // # # # #
// // # # # #
// // # # # #
// // # # # #
// // # # # #
//
// // When you have a program that generates this pattern, define a binding size = 8 and change
// // the program so that it works for any size, outputting a grid of the given width and height.
//
//
// let size = 8;
//
// let board = "";
//
// for (let y = 0; y < size; y++) {
//     for (let x = 0; x < size; x++) {
//         if ((x + y) % 2 == 0) {
//             board += " ";
//         } else {
//             board += "#";
//         }
//     }
//     board += "\n";
// }
//
// console.log(board);
