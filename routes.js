/*
Title:Row Node API Project
Description : Routes Defination
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const {simpleHandler}=require('./handler/routesHandle/simpleRoute')
const {userHandler}=require('./handler/routesHandle/userRoute')
const {tokenHandler}=require('./handler/routesHandle/tokenRoute')
const {checkHandler}=require('./handler/routesHandle/checkRoute')

// Routes object - scaffolding
const routes = {
    simple: simpleHandler,
    user:userHandler,
    token:tokenHandler,
    check:checkHandler,
};

// Export module
module.exports = routes;
