let {readFile} = require("fs").promises;
readFile("file.txt", "utf8")
   .then(text => console.log("The file contains:", text))

const {readFileSync} = require("fs")
console.log("\n\nThe file ontains:", readFileSync("file.txt", "utf8"))
