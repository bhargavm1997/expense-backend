const mongoose=require("mongoose")
Schema=mongoose.Schema


let userSchema=new Schema({
    userid:{
        type:String,
        default:"",
        unique:true

    },

    firstname:{
        type:String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    password:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
        default:0
    },
    country:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        default:""
    },
    createdOn:{
        type:Date,
        default:""
    },
    active:{
        type:Boolean,
        default:true
    }


})



mongoose.model("user",userSchema)