/*
Title:Row Node API Project
Description : Routes Handle Function
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependency 
const { read, create, update } = require('../../lib/data')
const data = require('../../lib/data')
const { hasingPass, parseJSON, createRandomToken } = require('../../helper/utilities');
const tokenRoute = require('./tokenRoute')
// app object - scaffolding
const handler = {};

// Simple rounter function
handler.checkHandler = (requestObject, callback) => {
    // console.log(requestObject);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestObject.method) > -1) {
        handler._check[requestObject.method](requestObject, callback);

    }
    else {
        callback(405);
    }

};
handler._check = {};
handler._check.post = (requestObject, callback) => {

    // console.log(requestObject);

    const protocol = typeof (requestObject.body.protocol) === 'string' && ['http', 'https'].indexOf(requestObject.body.protocol) > -1 ? requestObject.body.protocol : false;

    const url = typeof (requestObject.body.url) === 'string' && requestObject.body.url.trim().length > 0 ? requestObject.body.url : false;

    const method = typeof (requestObject.body.method) === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestObject.body.method) > -1 ? requestObject.body.method : false;

    const successCodes = typeof (requestObject.body.successCodes) === 'object' && requestObject.body.successCodes instanceof Array ? requestObject.body.successCodes : false;

    const timeOutSeconds = typeof (requestObject.body.timeOutSeconds) === 'number' && requestObject.body.timeOutSeconds % 1 === 0 && requestObject.body.timeOutSeconds >= 1 && requestObject.body.timeOutSeconds <= 5 ? requestObject.body.timeOutSeconds : false;

    console.log(protocol, url, method, successCodes, timeOutSeconds);

    if (protocol && url && method && successCodes && timeOutSeconds) {

        const tokenID = typeof (requestObject.headersObject.token) === 'string' && requestObject.headersObject.token.trim().length === 21 ? requestObject.headersObject.token : false;

        data.read('token', tokenID, (err, tokenData) => {
            const token = parseJSON(tokenData);
            const phone = token.phone;
            if (!err && tokenData) {
                tokenRoute._token.verify(tokenID, phone, (tokenBol) => {
                    if (tokenBol) {
                        data.read('user', phone, (err, userData) => {
                            const uData = parseJSON(userData)
                            if (!err && userData) {
                                const userCheck = typeof (uData.check) === 'object' && uData.check instanceof Array ? uData.check : [];
                                if (userCheck.length < 5) {
                                    const checkId = createRandomToken(20);
                                    const checkObj = {
                                        checkId,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeOutSeconds,
                                        phone
                                    }
                                    data.create('check', checkId, checkObj, (err) => {
                                        if (!err) {
                                            uData.check = userCheck;
                                            uData.check.push(checkId)
                                            data.update('user', phone, uData, (err) => {
                                                if (!err) {
                                                    callback(200, uData)
                                                } else {
                                                    callback(400, {
                                                        error: "Update failed.!"
                                                    })
                                                }
                                            })
                                        } else {
                                            callback(400, {
                                                error: "There is an error in server side!"
                                            })
                                        }
                                    })
                                }
                                else {
                                    callback(400, {
                                        error: "user check list is full!"
                                    })
                                }

                            } else {
                                callback(400, {
                                    error: "User info not found!!"
                                })
                            }
                        })
                    } else {
                        callback(400, {
                            error: "Authentication Failed!"
                        })
                    }
                })
            }
            else {
                callback(400, {
                    error: "Token not match!"
                })
            }
        })
    }
    else {
        callback(400, {
            error: "There is an error in your request"
        })
    }


};
handler._check.get = (requestObject, callback) => {
    const id =
        typeof requestObject.qureyObject.id === 'string' &&
            requestObject.qureyObject.id.trim().length === 21
            ? requestObject.qureyObject.id
            : false;

    // console.log(id);

    if (id) {
        data.read('check', id, (err, checkData) => {
            const checkObj = parseJSON(checkData)
            // console.log(checkData);
            if (checkObj) {
                const tokenId = typeof requestObject.headersObject.token === 'string'
                    ? requestObject.headersObject.token
                    : false;
                tokenRoute._token.verify(tokenId, checkObj.phone, (bools) => {
                    if (bools) {
                        callback(200, checkObj)
                    } else {
                        callback(400, {
                            error: "Authentication failed!"
                        })
                    }
                })
            } else {
                callback(400, {
                    error: "There is an error in Server side!"
                })
            }
        })
    } else {
        callback(400, {
            error: "Invalid TokenID!"
        })
    }
};
handler._check.put = (requestObject, callback) => {

    const protocol = typeof (requestObject.body.protocol) === 'string' && ['http', 'https'].indexOf(requestObject.body.protocol) > -1 ? requestObject.body.protocol : false;

    const url = typeof (requestObject.body.url) === 'string' && requestObject.body.url.trim().length > 0 ? requestObject.body.url : false;

    const method = typeof (requestObject.body.method) === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestObject.body.method) > -1 ? requestObject.body.method : false;

    const successCodes = typeof (requestObject.body.successCodes) === 'object' && requestObject.body.successCodes instanceof Array ? requestObject.body.successCodes : false;

    const timeOutSeconds = typeof (requestObject.body.timeOutSeconds) === 'number' && requestObject.body.timeOutSeconds % 1 === 0 && requestObject.body.timeOutSeconds >= 1 && requestObject.body.timeOutSeconds <= 5 ? requestObject.body.timeOutSeconds : false;


    const id =
        typeof requestObject.qureyObject.id === 'string' &&
            requestObject.qureyObject.id.trim().length === 21
            ? requestObject.qureyObject.id
            : false;

        if(id){
            if(protocol||url||method||successCodes||timeOutSeconds){
                data.read('check',id,(err,checkData)=>{
                    const checkObj=parseJSON(checkData);
                    console.log(checkObj);
                    if(checkObj){
                        const tokenId = typeof requestObject.headersObject.token === 'string'
                        ? requestObject.headersObject.token
                        : false;
                    tokenRoute._token.verify(tokenId,checkObj.phone,(bools)=>{
                        if(bools){
                            if(protocol){
                                checkObj.protocol=protocol
                            }
                            if(url){
                                checkObj.url=url
                            }
                            if(method){
                                checkObj.method=method
                            }
                            if(successCodes){
                                checkObj.successCodes=successCodes
                            }
                            if(timeOutSeconds){
                                checkObj.timeOutSeconds=timeOutSeconds
                            }

                            data.update('check',id,checkObj,(err)=>{
                                if(!err){
                                    callback(400, checkObj) 
                                }
                                else{
                                    callback(400, {
                                        error: "Update failed!"
                                    }) 
                                }
                            })
                        }else{
                            callback(400, {
                                error: "Authentication failed!"
                            }) 
                        }
                    })
                    }else {
                        callback(400, {
                            error: "There has been a problem in your request!"
                        })
                    }
                })
            }else{
                callback(400, {
                    error: "There has been a problem in your request!"
                })
            }
        }
        else {
            callback(400, {
                error: "There has been a problem in your request!"
            })
        }

};

handler._check.delete = (requestObject, callback) => {
    const id =
        typeof requestObject.qureyObject.id === 'string' &&
            requestObject.qureyObject.id.trim().length === 21
            ? requestObject.qureyObject.id
            : false;

    // console.log(id);

    if (id) {
        data.read('check', id, (err, checkData) => {
            const checkObj = parseJSON(checkData)
            // console.log(checkData);
            if (checkObj) {
                const tokenId = typeof requestObject.headersObject.token === 'string'
                    ? requestObject.headersObject.token
                    : false;
                tokenRoute._token.verify(tokenId, checkObj.phone, (bools) => {
                    if (bools) {
                        data.read('user', checkObj.phone, (err, uData) => {
                            console.log(uData);
                            const userData = parseJSON(uData);
                            if (userData) {


                                const userCheck = typeof userData.check === 'object' && userData.check instanceof Array ? userData.check : [];

                                console.log(userCheck);

                                const possiblePosition = userCheck.indexOf(id);

                                console.log(possiblePosition);
                                if (possiblePosition > -1) {
                                    userCheck.splice(possiblePosition - 1, 1)
                                    userData.check = userCheck;

                                    data.update('user', checkData.phone, userData, (err) => {
                                        if (!err) {
                                            callback(200, {
                                                userData
                                            })
                                        } else {
                                            callback(400, {
                                                error: "Update failed!"
                                            })
                                        }
                                    })
                                }

                            } else {
                                callback(400, {
                                    error: "User information not found !"
                                })
                            }
                        })
                        data.delete('check', id, (err) => {
                            if (!err) {
                                callback(200, {
                                    error: "Deleted!"
                                })
                            } else {
                                callback(400, {
                                    error: "There have been a problem!"
                                })
                            }
                        })
                    } else {
                        callback(400, {
                            error: "Authentication failed!"
                        })
                    }
                })
            } else {
                callback(400, {
                    error: "There is an error in Server side!"
                })
            }
        })
    } else {
        callback(400, {
            error: "Invalid TokenID!"
        })
    }
};
// Export module
module.exports = handler;
