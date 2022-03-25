/*
Title:Row Node API Project
Description : This is row node project
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const http = require('http');
const { handleReqRes } = require('./helper/handlerReqRes');
const environments=require('./helper/environment')
const data=require('./lib/data')

// App Object -Module Scaffoling
const app = {};

// test api 
// let smdata={
//     name:"sobuj",
    
// }
// data.delete("test","smsobuj",(err)=>{
//     console.log(err);
// });



// Create server Function
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environments.port, environments.hostname, () => {
        // console.log(environment);
        console.log(`listen the server ${environments.port}`);
    });
};
// Handle request and response
app.handleReqRes = handleReqRes;
// Create server function call
app.createServer();
