/*
Title:Row Node API Project
Description : This is row node project
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const {notfoundHandler}=require('../handler/routesHandle/notFound');
const {parseJson}=require('../helper/utilities');

// App Object -Module Scaffoling
const handler = {};
// Configaration

handler.handleReqRes = (req, res) => {
    // res.end('hello')
    const parseUrl = url.parse(req.url, true);
    const qureyObject = parseUrl.query;
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const method = req.method.toLowerCase();
    const headersObject = req.headers;


    const decoder = new StringDecoder('utf8');
    let realData = '';

    const requestObject = {
        parseUrl,
        qureyObject,
        path,
        trimmedPath,
        method,
        headersObject
    };

    const chooseHandler = routes[trimmedPath] ? routes[trimmedPath] : notfoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        // console.log(realData);
        requestObject.body = parseJson(realData);
        // console.log(parseJson(realData));
        chooseHandler(requestObject, (statusCode, payload) => {
            const statuscode = typeof statusCode === 'number' ? statusCode : 500;
            const payloadobj = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payloadobj);
            res.setHeader("Content-Type","application/json");
            res.writeHead(statuscode);
            res.end(payloadString);
        });
    });
};

// Export Library
module.exports = handler;
