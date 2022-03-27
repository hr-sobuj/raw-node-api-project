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

    console.log(protocol , url ,method , successCodes , timeOutSeconds);

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

};
handler._check.put = (requestObject, callback) => {


};

handler._check.delete = (requestObject, callback) => {

};
// Export module
module.exports = handler;
