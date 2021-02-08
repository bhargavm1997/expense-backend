const jwt= require("jsonwebtoken")
const shortid=require("shortid")
const key="any text"



let generateToken=(data,cbb)=>
{
try{

    let claims={
        jwtid:shortid.generate(),
        ist:Date.now(),
        exp:1000,
        sub:"authToken",
        iss:"edChat",
        data:data
    }
    let tokenDetails={
        token:jwt.sign(claims,key)

    }
    cbb(null,tokenDetails)
}
catch(err){
    console.log("error")
    cbb(null,err)
}

}


let verifyToken=()=>
{
    


}



module.exports={

generateToken:generateToken,
verifyToken:verifyToken
}