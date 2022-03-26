/*
Title:Row Node API Project
Description : Routes Handle Function
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependency 
const data = require('../../lib/data')
const { hasingPass, parseJSON,createRandomToken } = require('../../helper/utilities');

// app object - scaffolding
const handler = {};

// Simple rounter function
handler.tokenHandler = (requestObject, callback) => {
    // console.log(requestObject);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestObject.method) > -1) {
        handler._token[requestObject.method](requestObject, callback);

    }
    else {
        callback(405);
    }

};
handler._token = {};
handler._token.post = (requestObject, callback) => {

    // console.log("body",requestObject.body);

    const phone = typeof (requestObject.body.phone) === 'string' && requestObject.body.phone.trim().length === 11 ? requestObject.body.phone : false;

    const password = typeof (requestObject.body.password) === 'string' && requestObject.body.password.trim().length > 0 ? requestObject.body.password : false;

    // console.log(phone,password);


    if (phone && password) {
        data.read('user', phone, (err, uData) => {
            const userData = { ...parseJSON(uData) };
            // console.log(userData);
            if (userData) {
                const pass = hasingPass(password);
                if (userData.password === pass) {
                    let tokenId = createRandomToken(20);
                    let expires = Date.now() * 60 * 60 * 1000;
                    // console.log(tokenId);
                    let tokenObj = {
                        tokenId,
                        phone,
                        expires
                    }
                    data.create('token', tokenId, tokenObj, (err) => {
                        if (!err) {
                            callback(200, {
                                message: "Token generated"
                            })
                        } else {
                            callback(400, {
                                error: "Password not match!"
                            })
                        }
                    })
                } else {
                    callback(400, {
                        error: "Password not match!"
                    })
                }

            } else {
                callback(400, {
                    error: "There have an error."
                })
            }
        })
    }
    else {
        callback(400, {
            error: "There have an error."
        })
    }
};
handler._token.get = (requestObject, callback) => {

    console.log(requestObject.qureyObject.id);
     
    const id=typeof(requestObject.qureyObject.id)==='string' &&  requestObject.qureyObject.id.trim().length===21? requestObject.qureyObject.id:false;
console.log(id);
    if(id){
        data.read('token',id,(err,Tokendata)=>{
            console.log("Tokendata",Tokendata);
            let token={...parseJSON(Tokendata)}
            // console.log(users);
            if(!err ){
                callback(200,token);
            }
            else{
                callback(400,{
                    error:"Token not found!"
                });
            
            }
        })
    }else{
        callback(400,{
            error:"Token invalid!"
        })
    }

};
handler._token.put = (requestObject, callback) => {

};

handler._token.delete = (requestObject, callback) => {

};
// Export module
module.exports = handler;
