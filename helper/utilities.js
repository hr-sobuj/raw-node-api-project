/*
Title:Row Node API Project
Description : Utilities
Author: Habibur Rahman Sobuj
Date: 25/03/2022
*/

// Denpandancy
const crypto = require('crypto');

// Module Scaffolding 
const utilities={};

// parse string to json 
utilities.parseJson = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch(error) {
        console.log(error);
        output = {};
    }

    return output;
};
// utilities.parseJson=(jsonString)=>{
//     let output;
   
//     try {
//         output=JSON.parse(jsonString)
//     } catch {
//         output={}
//     }
//     console.log(output);
//     return output;
// }

//hashing password 
utilities.hasingPass=(str)=>{

    if (typeof str === 'string' && str.length > 0) {
        let secret='iudfjhdfgh';
        const hash = crypto.createHmac('sha256', secret)
               .update(str)
               .digest('hex');
        return hash;
    }
    return false;

}

// export module 
module.exports=utilities;
