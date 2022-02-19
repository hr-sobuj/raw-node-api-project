/*
Title:Row Node API Project
Description : Routes Handle Function
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// app object - scaffolding
const handler = {};


// Not found Router function
handler.notfoundHandler = (requestObject, callback) => {
    // console.log(requestObject);
    callback(404, {
        message: 'Url not found!',
    });
};

// Export module
module.exports = handler;
