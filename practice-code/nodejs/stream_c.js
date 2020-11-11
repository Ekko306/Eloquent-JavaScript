const {request} = require("http")
const req = request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, response => {
  response.on("data", chunk => console.log(chunk.toString())
  )})

req.write("Hello World")
req.end()