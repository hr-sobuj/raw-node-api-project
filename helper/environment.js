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
}
// production object 
environment.production={
    port:5000,
    hostname:'localhost',
    mode:'production',
}

// current environment
let currentEnvironment =typeof process.env.NODE_ENV==='string'?process.env.NODE_ENV:'staging';
//export environment
// console.log(process.env.NODE_ENV);
const environmentToExport =typeof environment[currentEnvironment ]==='object'?environment[currentEnvironment]:environment.staging;
// console.log(environmentToExport [currentEnvironment]);
// export module 
module.exports=environmentToExport;
