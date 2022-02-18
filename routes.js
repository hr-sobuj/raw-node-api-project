/*
Title:Row Node API Project
Description : Routes Defination
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const handler = require('./handler/routesHandle/simpleHandle');

// Routes object - scaffolding
const routes = {
    simple: handler.simpleHandler,
    notfound: handler.notfoundHandler,
};

// Export module
module.exports = routes;
