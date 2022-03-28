/*
Title:Row Node API Project
Description : This is row node project
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const server=require('./lib/server');
const workers=require('./lib/worker');
// App Object -Module Scaffoling
const app = {};

// initilization 

app.init=()=>{
    server.init();
    workers.init();
}

app.init();

module.exports=app;
