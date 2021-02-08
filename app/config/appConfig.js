let json={}
json.port=3000;
json.allowedCorseOrigin="*";
json.env="dev";
json.db={
    uri:"mongodb://localhost:27017/expense"
}
json.apiVer='/api/v1'


module.exports={


port:json.port,
allowedCorseOrigin:json.allowedCorseOrigin,
env:json.env,
db:json.db,
ver:json.apiVer

}