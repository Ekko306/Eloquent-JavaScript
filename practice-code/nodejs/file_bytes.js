let {readFile} = require("fs")
readFile("file.txt", (error, buffer) => {
  if (error) throw error;
  console.log("The file contained:", buffer.length, "bytes.", "The first byte is", buffer[0])
})
