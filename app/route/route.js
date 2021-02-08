const express=require("express")
const appconfig=require("../config/appConfig")
const cont=require("../controller/controller")



module.exports.setRouter=(app)=>
{
    let baseurl=`${appconfig.ver}`
    app.post(`${baseurl}/signup`, cont.signup)
    app.post(`${baseurl}/login`, cont.login)
    app.post(`${baseurl}/friends/add`, cont.addfriend)
    app.get(`${baseurl}/list`,cont.list)
    app.post(`${baseurl}/group/add`,cont.group)
    app.get(`${baseurl}/group/list`,cont.glist)
    app.get(`${baseurl}/group/view`,cont.singleView)
    app.get(`${baseurl}/getUser`,cont.userById)
    app.post(`${baseurl}/addExpense`,cont.addExpense)
    app.get(`${baseurl}/elist`,cont.elist)
    app.get(`${baseurl}/getExpense`,cont.getExpense)
    app.put(`${baseurl}/editExpense`,cont.editExpense)
}