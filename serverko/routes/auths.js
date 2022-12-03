const express=require('express');
const router=express.Router();
const User=require('../models/User');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let toks=null;
let pwd=null;

//find and match email and password
router.post('/',(request,response)=>{
    if(request.body.status){//if the email and address are correct return true
        //find the email
        User.findOne({email:request.body.email}).then(result=>{
            if(result!==null){
                //match the password
                const decrypt=bcrypt.compareSync(request.body.password, result.password);
                if(decrypt){
                    toks=result.token;
                    pwd=request.body.password;
                    response.send({decrypt,token:toks});
                }else{
                    response.send(decrypt)
                }
            }else{
                response.send(false)
            }
        });
    }else{//return the user information
        const userToken=request.body.token;
        User.findOne({token:userToken},{
            _id:0,
            password:0,
            createdAt:0,
            updatedAt:0,
            __v:0
        }).then(result=>{
            if(result!==null){
                let users=result;
                users.password=pwd;
                response.send(result);
            }else{
                response.send(false);
            }
        });
    }
    
})

module.exports=router;
