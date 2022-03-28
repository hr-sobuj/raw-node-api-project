/*
Title:Row Node API Project
Description : Environment Variable
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Module Scaffolding 
const environment={}

// staging object 
environment.staging={
    port:3000,
    hostname:'localhost',
    mode:'staging',
    twilio:{
        fromPhone:'+8801521471319',
        accountsid:'ACa67b65d80c6c2e033254da6bc6cddeb6',
        authToken:'1b4a225eb55bb00518d6d0937b438e53'
    }
}
// production object 
environment.production={
    port:5000,
    hostname:'localhost',
    mode:'production',
    twilio:{
        fromPhone:'',
        accountsid:'ACa67b65d80c6c2e033254da6bc6cddeb6',
        authToken:'1b4a225eb55bb00518d6d0937b438e53'
    }
}

// current environment
let currentEnvironment =typeof process.env.NODE_ENV==='string'?process.env.NODE_ENV:'staging';
//export environment
// console.log(process.env.NODE_ENV);
const environmentToExport =typeof environment[currentEnvironment ]==='object'?environment[currentEnvironment]:environment.staging;
// console.log(environmentToExport [currentEnvironment]);
// export module 
module.exports=environmentToExport;
