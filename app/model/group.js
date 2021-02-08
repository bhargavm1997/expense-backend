const mongoose=require("mongoose"),
Schema=mongoose.Schema


let groupSchema= new Schema({

groupId:
{
    type:String,
    default:"",
    unique:true

},

groupName:
{
    type:String,
    default:""
},


createdBy:
{
    type:String,
    default:""


},

createdOn:
{
    type:Date,
    default:""
},

users:
[{
    type:Schema.Types.ObjectId,
    ref:"user"
}]







})


mongoose.model("group",groupSchema)