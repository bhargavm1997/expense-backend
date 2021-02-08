const mongoose=require("mongoose")
const model=mongoose.model("user")
const expense=mongoose.model("expense")
const group=mongoose.model("group")
const history=mongoose.model("history")
const token=require("../lib/generateToken")
const auth=require("../model/authModel")

const short=require("shortid")
const response=require("../lib/responselib")



let signup=(req,res)=>{
    var id=short.generate()
let user=new model(
    {
       
        userid:id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
mobile:req.body.mobile,
country:req.body.country,
createdBy:id

    },

)

user.save((err,user)=>
{
    if(err)
    {
        console.log(err)
        let apiResponse=response.generate(true,"error occured",500,null)
        res.send(apiResponse)

    }
    else{
        let newUserObject=user.toObject()
        let apiResponse=response.generate(false,"success",200,newUserObject)
        res.send(apiResponse)
    }

})
}






let login=(req,res)=>{
model.findOne({
    email:req.body.email,

},(err,result)=>
{
    if(err)
    {
        console.log(err)
        let apiResponse=response.generate(true,"error occured",500,null)
        res.send(apiResponse);
    }
    else{
        let apiResponse=response.generate(false,"success",200,result)
        generateToken(result)
        res.send(apiResponse)

    }
})
}
let generateToken = (userDetails) => {
    console.log("generate token");
        token.generateToken(userDetails, (err, tokenDetails) => {
            console.log(tokenDetails)
            if (err) {
                console.log(err)
              
            } else {
                tokenDetails.userId = userDetails.userid
                tokenDetails.userDetails = userDetails
               saveToken(tokenDetails)
            }
           

        })
}
let saveToken=(tokenDetails)=>
{
    auth.findOne({userid:tokenDetails.userid},(err,result)=>
    {
        if(err)
        {
            let apiResponse=response.generate(true,"error",500,null)
            res.send(apiResponse)
        }
        else
        {
            let newAuth=new auth({
userid:tokenDetails.userid,
token:tokenDetails.token,
tokenKey:tokenDetails.tokenSecret

            })
            newAuth.save((error,output)=>
            {
           
        if(error)
        {
            let apiResponse=response.generate(true,"error",500,null)
            res.send(apiResponse)
              
         }
            else{
                let a=output.toObject()
                let apiResponse=response.generate(flase,"success",200,a)
                res.send(apiResponse)
            }
        });
    }
    })
}



let addfriend=(req,res)=>
{
    var id=short.generate()
let add=new model({ 

    userid:id,
    firstname:req.body.name,
    
    email:req.body.email,
    createdBy:req.body.createdBy,
    



})
add.save((err,result)=>
{
    if(err)
    {
        console.log(err)
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let obj=result.toObject();
        let apiResponse=response.generate(false,"success",200,obj)
res.send(apiResponse)
    }
})
}

let list=(req,res)=>
{
let single={}
single["createdBy"]=req.query.userid
model.find(single)
.select("-_v")
.lean().exec((err,result)=>
{

    if(err)
    {
        console.log(err)
        let apiResponse=response.generate(true,"error occured",500,null)
        res.send(apiResponse)

    }
    else{
        
        let apiResponse=response.generate(false,"success",200,result)
        res.send(apiResponse)
    }

   
})



}

let groupadd=(req,res)=>
{

let a=new group({
    groupId:short.generate(),
    groupName:req.body.name,
    createdBy:req.body.createdBy,
    users:req.body.friend

})
a.save((err,result)=>
{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{

        let groupObject=result.toObject()
        console.log(groupObject)
        let apiResponse=response.generate(false,"success",200,groupObject)
        res.send(apiResponse)
    }
})



}



let glist=(req,res)=>
{
    console.log(req.query.userid)
group.find({
    "users":{$in:[
    mongoose.Types.ObjectId(req.query.userid)
]}
},function(err,result)
{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let apiResponse=response.generate(false,"success",200,result)
        res.send(apiResponse)

    }
})





}




let singleView=(req,res)=>
{

let a={}
a["_id"]=req.query.groupid

group.find(a)
.select("-_v")
.lean().exec((err,result)=>
{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let apiResponse=response.generate(false,"success",200,result)
        res.send(apiResponse)
    }
})

}

let userById=(req,res)=>
{
console.log(req.query.userid)
let a={}
a["_id"]=req.query.userid

model.find(a)
.select("-_v")
.lean().exec((err,result)=>
{
    if(err)
    {
    let apiResponse=response.generate(true,"error",500,null)
    res.send(apiResponse)
    }
    else{
        let apiResponse=response.generate(false,"success",200,result)
        res.send(apiResponse)
    }
})
}


let addExpense=(req,res)=>
{
let a=new expense({


    expId:short.generate(),
    expName:req.body.expName,
    groupName:req.body.group,
    amount:req.body.amount,
    users:req.body.friend,
    paidBy:req.body.paidBy




})

a.save((err,result)=>
{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let expenseObj=result.toObject()
        let apiResponse=response.generate(false,"success",200,expenseObj)
        res.send(apiResponse)
    }
})
    
}


let elist=(req,res)=>
{

expense.find({
    "users":{$in:[
        mongoose.Types.ObjectId(req.query.userid)
    ]
    }
},
function(err,result)
{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let apiResponse=response.generate(false,"success",200,result)
        res.send(apiResponse)
    }
}


)


}


let getExpense=(req,res)=>
{

let a={}

a["_id"]=req.query.id
expense.find(a)
.select("-_v")
.lean().exec((err,result)=>{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let apiResponse=response.generate(false,"error",200,result)
        res.send(apiResponse)
    }
})


}



let editExpense=(req,res)=>
{
expense.findOneAndUpdate({
    expId:req.body.expId
},req.body,{
    multi:true
}).exec((err,result)=>
{
    if(err)
    {
        let apiResponse=response.generate(true,"error",500,null)
        res.send(apiResponse)
    }
    else{
        let apiResponse=response.generate(false,"success",200,result)
        res.send(apiResponse)
    }
})

}



/*let newhistory=(message,newExpense,_id)=>
{

let new history()

}

*/

module.exports={
    signup:signup,
login:login,
addfriend:addfriend,
list:list,
group:groupadd,
glist:glist,
singleView:singleView,
userById:userById,
addExpense:addExpense,
elist:elist,
getExpense:getExpense,
editExpense:editExpense,


}









