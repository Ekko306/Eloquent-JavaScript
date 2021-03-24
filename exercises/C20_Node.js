// Exercises


// // 1⃣️
// // Search tool
// // On Unix systems, there is a command line tool called grep that can be used to
// // quickly search files for a regular expression.
// //
// // Write a Node script that can be run from the command line and acts somewhat like
// // grep. It treats its first command line argument as a regular expression and treats
// // any further arguments as files to search. It should output the names of any file
// // whose content matches the regular expression.
// //
// // When that works, extend it so that when one of the arguments is a directory, it
// // searches through all files in that directory and its subdirectories.
// //
// // Use asynchronous or synchronous file system functions as you see fit. Setting things
// // up so that multiple asynchronous actions are requested at the same time might speed
// // things up a little, but not a huge amount, since most file systems can read only
// // one thing at a time.
//
//
// const {statSync, readdirSync, readFileSync} = require("fs");
//
// let searchTerm = new RegExp(process.argv[2]);
//
// for (let arg of process.argv.slice(3)) {
//     search(arg);
// }
//
// function search(file) {
//     let stats = statSync(file);
//     if (stats.isDirectory()) {
//         for (let f of readdirSync(file)) {
//             search(file + "/" + f);
//         }
//     } else if (searchTerm.test(readFileSync(file, "utf8"))) {
//         console.log(file);
//     }
// }



// // 2⃣️
// // Directory creation
// // Though the DELETE method in our file server is able to delete directories
// // (using rmdir), the server currently does not provide any way to create a directory.
// //
// // Add support for the MKCOL method (“make collection”), which should create a
// // directory by calling mkdir from the fs module. MKCOL is not a widely used HTTP
// // method, but it does exist for this same purpose in the WebDAV standard, which
// // specifies a set of conventions on top of HTTP that make it suitable for creating
// // documents.
//
// // This code won't work on its own, but is also included in the
// // code/file_server.js file, which defines the whole system.
//
// const {mkdir} = require("fs").promises;
//
// methods.MKCOL = async function(request) {
//     let path = urlPath(request.url);
//     let stats;
//     try {
//         stats = await stat(path);
//     } catch (error) {
//         if (error.code != "ENOENT") throw error;
//         await mkdir(path);
//         return {status: 204};
//     }
//     if (stats.isDirectory()) return {status: 204};
//     else return {status: 400, body: "Not a directory"};
// };





// // 3⃣️
// // A public space on the web
// // Since the file server serves up any kind of file and even includes the right
// // Content-Type header, you can use it to serve a website. Since it allows
// // everybody to delete and replace files, it would be an interesting kind of
// // website: one that can be modified, improved, and vandalized by everybody who
// // takes the time to create the right HTTP request.
// //
// // Write a basic HTML page that includes a simple JavaScript file. Put the files in
// // a directory served by the file server and open them in your browser.
// //
// // Next, as an advanced exercise or even a weekend project, combine all the knowledge
// // you gained from this book to build a more user-friendly interface for modifying
// // the website—from inside the website.
// //
// // Use an HTML form to edit the content of the files that make up the website,
// // allowing the user to update them on the server by using HTTP requests, as
// // described in Chapter 18.
// //
// // Start by making only a single file editable. Then make it so that the user can
// // select which file to edit. Use the fact that our file server returns lists of files
// // when reading a directory.
// //
// // Don’t work directly in the code exposed by the file server since if you make a
// // mistake, you are likely to damage the files there. Instead, keep your work outside
// // of the publicly accessible directory and copy it there when testing.
//
// https://eloquentjavascript.net/code/file_server.js
