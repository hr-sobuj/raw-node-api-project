/*
Title:Row Node API Project
Description : Notification Handle
Author: Habibur Rahman Sobuj
Date: 25/03/2022
*/

// Denpandancy
const https = require('https');
const twilio=require('./environment');
const querystring=require('querystring')
// for routes looking like this `/products?page=1&pageSize=50`

// Module Scaffolding 
const notification={};

console.log(twilio.twilio.fromPhone);

// send sms to twilio 
notification.sendSMS=(phone,msg,callback)=>{
    const uPhone=typeof(phone)==='string'?phone.trim():false;
    const uMsg=typeof(msg)==='string' && msg.length<=1600?msg:false;

    if(uPhone && uMsg){
        const payload={
            From:'+15017122661',
            To:`+15558675310`,
            Body:'hello'
        }

        const stringifyPayload=querystring.stringify(payload);

        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/ACa67b65d80c6c2e033254da6bc6cddeb6/Messages.json`,
            auth: `ACa67b65d80c6c2e033254da6bc6cddeb6:1b4a225eb55bb00518d6d0937b438e53`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

          const req=https.request(requestDetails,(res)=>{
              const statusCode=res.statusCode;
              if(statusCode===200 || statusCode===201){
                  callback(false)
              }else{
                  callback(`Status code is ${statusCode}`)
              }
          });

          req.on('error',(err)=>{
              callback(err)
          })
          req.write(stringifyPayload);
          req.end()


    }else{
        callback("given information is incorrect!")
    }
}

// export module 
module.exports=notification;
