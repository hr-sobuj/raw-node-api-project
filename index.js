/*
Title:Row Node API Project 
Description : This is row node project 
Author: Habibur Rahman Sobuj
Date: 17/2/2022 
*/

// Dependencies
const http=require('http')
// App Object -Module Scaffoling 
const app={}
// Configaration 
app.config={
port : 3000,
hostname:'localhost'
}
// Create server Function 
app.createServer=()=>{
    const server=http.createServer(handleReqRes)
    server.listen(app.config.port,app.config.hostname,()=>{
        console.log(`listen the server ${app.config.port}`);
    })
}
// Handle request and response 
app.handleReqRes=(req,res)=>{
    console.log(req);
}

