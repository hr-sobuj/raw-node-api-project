/*
Title:Row Node API Project
Description : Routes Handle Function
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependency 
const {read,create, update}=require('../../lib/data')
const data=require('../../lib/data')
const {hasingPass,parseJSON}=require('../../helper/utilities');

// app object - scaffolding
const handler = {};

// Simple rounter function
handler.userHandler = (requestObject, callback) => {
    // console.log(requestObject);
    const acceptedMethod=['get','post','put','delete'];
    if(acceptedMethod.indexOf(requestObject.method)>-1){
        handler._user[requestObject.method](requestObject,callback);

    }
    else{
        callback(405);
    }
   
};
handler._user={};
handler._user.post=(requestObject,callback)=>{

    // console.log(requestObject);

    const firstName=typeof(requestObject.body.firstName)==='string' &&  requestObject.body.firstName.trim().length>0?requestObject.body.firstName:false;

    const lastName=typeof(requestObject.body.lastName)==='string' &&  requestObject.body.lastName.trim().length>0? requestObject.body.lastName:false;

    const phone=typeof(requestObject.body.phone)==='string' &&  requestObject.body.phone.trim().length===11? requestObject.body.phone:false;

    const password=typeof(requestObject.body.password)==='string' && requestObject.body.password.trim().length>0? requestObject.body.password:false;

    const toAgreement=typeof(requestObject.body.toAgreement)==='boolean'?requestObject.body.toAgreement:false;

    // console.log("password",typeof(requestObject.body.password));
    // console.log(firstName,lastName,phone,password,toAgreement);

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
    
    const phone=typeof(requestObject.qureyObject.phone)==='string' &&  requestObject.qureyObject.phone.trim().length===11? requestObject.qureyObject.phone:false;
// console.log(phone);
    if(phone){
        read('user',phone,(err,data)=>{
            // console.log(data);
            let users={...parseJSON(data)}
            // console.log(users);
            if(!err ){
                delete users.password;
                callback(200,users);
            }
            else{
                callback(400,{
                    error:"User not found!"
                });
            
            }
        })
    }else{
        callback(400,{
            error:"Phone number invalid!"
        })
    }
};
handler._user.put=(requestObject,callback)=>{

// console.log("requestObject",requestObject);
    const firstName=typeof(requestObject.body.firstName)==='string' &&  requestObject.body.firstName.trim().length>0?requestObject.body.firstName:false;

    const lastName=typeof(requestObject.body.lastName)==='string' &&  requestObject.body.lastName.trim().length>0? requestObject.body.lastName:false;

    const phone=typeof(requestObject.body.phone)==='string' &&  requestObject.body.phone.trim().length===11? requestObject.body.phone:false;

    const password=typeof(requestObject.body.password)==='string' &&  requestObject.body.password.trim().length>0? requestObject.body.password:false;

    console.log(requestObject);
    if(phone){
        if(firstName||lastName||password){
            read('user',phone,(error,uData)=>{
                const userData={...parseJSON(uData)}
                console.log("uinfo",userData);
                if(userData){
                        
                            if(firstName){
                                userData.firstName=firstName
                            }
                            if(lastName){
                                userData.lastName=lastName
                            }
                            if(password){
                                userData.password=hasingPass(password)
                            }
                            update('user',phone,userData,(err1)=>{
                                if(!err1){
                                    callback(200,{
                                        message:"User Updated Successfully!"
                                    })
                                }
                                else{
                                    callback(200,{
                                        message:"There is an problem for update!"
                                    })
                                }
                            })
                }
                else{
                    callback(400,{
                        error:"There has an error in server side!"
                    })
                }
            })
        }
        else{
            callback(400,{
                error:"You have a problem in your request"
            })
        }
    }
    else{
        callback(400,{
            error:"Invalid Phone number!"
        })
    }


};

handler._user.delete=(requestObject,callback)=>{
      
    const phone=typeof(requestObject.qureyObject.phone)==='string' &&  requestObject.qureyObject.phone.trim().length===11? requestObject.qureyObject.phone:false;
console.log(phone);
    if(phone){
        read('user',phone,(err,uData)=>{
            const userData={...parseJSON(uData)}
            if(userData){
                data.delete('user',phone,(error)=>{
                    if(!error){
                        callback(200,{
                            message:"User information is deleted!"
                        })
                    }
                    else{
                        callback(400,{
                            error:"Delete failed!"
                        })
                    }
                })
            }
            else{
                callback(400,{
                    error:"Your request is invalid!"
                })
            }
        })
    }
    else{
        callback(400,{
            error:"Invalid Phone number"
        })
    }
};
// Export module
module.exports = handler;
