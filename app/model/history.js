const mongoose=require("mongoose"),
Schema=mongoose.Schema


let historySchema= new Schema({
    expHistId:
    {
      type:String,
      default:"",
      unique:true  
    },
expenses:
    [{
        type:Schema.Types.ObjectId,
        ref:"expense"
    }],
    action:
    {
        type:String,
        default:""
    },

    thenBy:
    {
        type:String,
        default:""
    },
    time:
    {
        type:Date,
        default:""
    }


})



mongoose.model("history",historySchema)