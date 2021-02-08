const express=require("express")
const app=express()
const mongoose=require("mongoose")
const route="./app/route"
const config=require("./app/config/appConfig")
const model="./app/model"
const http=require("http")
const cors=require("cors")
const bp=require("body-parser")



app.use(bp.json())
app.use(bp.urlencoded({extended:false}))


app.use(cors())
app.all('*',function(req,res,next){
res.header("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE')
next();
})


const fs=require("fs")
const bodyParser = require("body-parser")
fs.readdirSync(model).forEach(function(file){

    if(~file.indexOf(".js"))
    {
        require(model + "/" + file)
    }
})


fs.readdirSync(route).forEach(function(file){

    if(~file.indexOf(".js"))
    {
        var a=require(route + "/" + file)
        a.setRouter(app)
    }
})

mongoose.connection.on("error",function(err){

console.log("databse connectiiom error")

})

mongoose.connection.on("open",function(err){

    if(err)
    {
        console.log(err)
    }
    else{
        console.log("database connection open success")
    }
})
const server=http.createServer(app)
console.log(config)
server.listen(config.port)


mongoose.connect(config.db.uri,{useMongoClient:true})