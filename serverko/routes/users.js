const express=require('express');
const router=express.Router();
const User=require('../models/User');
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const { response } = require('express');

//the token is updated when the user is logged out.
router.patch('/',(request,response)=>{
    const date=new Date();
    const toks=bcrypt.hashSync(date+'-', salt);
    User.findOneAndUpdate(
        { token: request.body.token }, 
        { $set: { token: toks} })
    .then( result => {
        response.send({ status: true });
    });
});
//updating the user information
router.put('/',(request,response)=>{
    let userInfo=request.body.user;
    const userToken=request.body.token;
    const pwd=bcrypt.hashSync(userInfo.password, salt);
    userInfo.password=pwd;
    User.updateOne(
        { token: userToken }, 
        { $set: { ...userInfo } })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status: "Profile Updated Successfully!" });
        }else{
            response.send({ status: "Error Intruder Detected!" });
        }
    });
})

module.exports=router;