const express = require("express")
const app = express()



app.get("/",(req,res)=>{
    res.send("Hello, This is server.js")
})



const port = 5000
app.listen(port,()=>{
    console.log(`Running on the port ${port}`)
})