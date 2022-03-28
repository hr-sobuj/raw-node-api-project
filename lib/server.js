/*
Title:Row Node API Project
Description : This is row node project
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const http = require('http');
const { handleReqRes } = require('../helper/handlerReqRes');
const environments=require('../helper/environment')

// App Object -Module Scaffoling
const server = {};


// Create server Function
server.createServer = () => {
    const servers = http.createServer(server.handleReqRes);
    servers.listen(environments.port, environments.hostname, () => {
        // console.log(environment);
        // console.log(process.env.NODE_ENV);
        console.log(`listen the server ${environments.port}`);
    });
};
// Handle request and response
server.handleReqRes = handleReqRes;
// Create server function call
server.init=()=>{
    server.createServer();
}

module.exports=server;
