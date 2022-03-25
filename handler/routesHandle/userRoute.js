/*
Title:Row Node API Project
Description : Routes Handle Function
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependency 
const {read,write,create}=require('../../lib/data')
const {hasingPass}=require('../../helper/utilities')
// app object - scaffolding
const handler = {};

// Simple rounter function
handler.userHandler = (requestObject, callback) => {
    // console.log(requestObject);
    const acceptedMethod=['get','post','put','delete'];
    if(acceptedMethod.indexOf(requestObject.method)>-1){
        handler._user[requestObject.method](requestObject,callback);
        console.log("accept");
    }
    else{
        callback(405);
    }
   
};
handler._user={};
handler._user.post=(requestObject,callback)=>{

    // console.log(requestObject);
console.log(typeof(requestObject.body.toAgreement));
    const firstName=typeof(requestObject.body.firstName)==='string' &&  requestObject.body.firstName.trim().length>0?requestObject.body.firstName:false;

    const lastName=typeof(requestObject.body.lastName)==='string' &&  requestObject.body.lastName.trim().length>0? requestObject.body.lastName:false;

    const phone=typeof(requestObject.body.phone)==='string' &&  requestObject.body.phone.trim().length===11? requestObject.body.phone:false;

    const password=typeof(requestObject.body.password)==='string' &&  requestObject.body.password.trim().length>0? requestObject.body.password:false;

    const toAgreement=typeof(requestObject.body.toAgreement)==='boolean'?requestObject.body.toAgreement:false;

    console.log(firstName,lastName,phone,password,toAgreement);

    if(firstName && lastName && phone && password && toAgreement){
        read('user',phone,(err)=>{
            if(err){
                const userObj={
                    firstName,
                    lastName,
                    phone,
                    password:hasingPass(password),
                    toAgreement
                    
                }
                create('user',phone,userObj,(error)=>{
                    if(!error){
                        callback(200,{
                            'message':'Your created successfully.'
                        })
                    }
                    else{
                        callback(500,{
                            'error':'An error has server side!'
                        })
                    }
                })
            }
            else{
                callback(400,{
                    error:"User already exits!"
                })
            }
        })
    }
    else{
        callback(400,{
            error:"There have an error."
        })
    }
};
handler._user.get=(requestObject,callback)=>{
    callback(200)
};
handler._user.put=(requestObject,callback)=>{
    callback(200)
};

// Export module
module.exports = handler;
