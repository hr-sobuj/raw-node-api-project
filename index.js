/*
Title:Row Node API Project
Description : This is row node project
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('./routes');

// App Object -Module Scaffoling
const app = {};
// Configaration
app.config = {
    port: 3000,
    hostname: 'localhost',
};
// Create server Function
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, app.config.hostname, () => {
        console.log(`listen the server ${app.config.port}`);
    });
};
// Handle request and response
app.handleReqRes = (req, res) => {
    // res.end('hello')
    const parseUrl = url.parse(req.url, true);
    const qureyObject = parseUrl.query;
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const method = req.method.toLowerCase();

    const decoder = new StringDecoder('utf8');
    let realData = '';

    const requestObject = {
        parseUrl,
        qureyObject,
        path,
        trimmedPath,
        method,
    };
    const chooseHandler = routes[trimmedPath] ? routes[trimmedPath] : routes.notfound;
    chooseHandler(requestObject, (statusCode, payload) => {
        const statuscode = typeof statusCode === 'number' ? statusCode : 500;
        const payloadobj = typeof payload === 'object' ? payload : {};
        const payloadString = JSON.stringify(payloadobj);
        res.writeHead(statuscode);
        res.end(payloadString);
    });

    res.on('data', (buffer) => {
        realData += decoder(buffer);
    });
    res.on('end', () => {
        realData += decoder.end();
        console.log(realData);
    });
};

// Create server function call
app.createServer();
