const mongoose=require("mongoose")
Schema=mongoose.Schema


let auth=new Schema(
    {
userid:{
    type:String,
    
},

token:{
    type:String
},

tokenKey:{
    type:String
},
generationTime:{
    type:Date,
    default:Date.now()
}



    })

    mongoose.model("auth",auth)