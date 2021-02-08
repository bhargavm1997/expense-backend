const mongoose=require("mongoose"),
Schema=mongoose.Schema



let expenseSchema= new Schema({

    expId:
    {
        type:String,
        default:"",
        unique:true
    
    },
    
    expName:
    {
        type:String,
        default:""
    },
    
    
    groupName:
    {
        type:String,
        default:""
    
    
    },
    
    amount:
    {
        type:Number,
        default:""
    },
      
    users:
    [{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    
    
    paidBy:
    {
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    active:
    {
        type:Boolean,
        default:true
    }

})
    mongoose.model("expense",expenseSchema)