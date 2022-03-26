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
utilities.parseJSON= (jsonString) => {
    console.log("jsonString",jsonString);
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch(error) {
        console.log(error);
        output = {};
    }
    console.log("output",output);
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
// random number generator 
utilities.createRandomToken=(strlen)=>{
    let leng=typeof(strlen)==='number'?strlen:false
    let possibleCharacter="abcdefghijklmnopqrstuvwxyz0123456789";
    let possibleLen=possibleCharacter.length;
    let output1;
    for(let i=0;i<=leng;i++){
        let randomCharacter=possibleCharacter.charAt(Math.floor(Math.random()*possibleLen))
        // console.log(randomCharacter);
        output1+=randomCharacter;
    }
    return output1;

}
// export module 
module.exports=utilities;
