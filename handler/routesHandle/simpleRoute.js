/*
Title:Row Node API Project
Description : Routes Handle Function
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// app object - scaffolding
const handler = {};

// Simple rounter function
handler.simpleHandler = (requestObject, callback) => {
    // console.log(requestObject);
    callback(200, {
        message: 'it is a simple path',
    });
};

// Export module
module.exports = handler;
