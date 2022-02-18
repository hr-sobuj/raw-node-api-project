/*
Title:Row Node API Project
Description : Data Handle
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/


// Dependencies
const fs=require('fs');
const path = require('path');

// Module Scaffolding 
const lib={}

//Base dir
lib.basedir=path.join(__dirname,'/../.data/');
// console.log("dir",lib.basedir);
// Create File
lib.create=(dir,file,data,callback)=>{
    // open file for write data
    // console.log(`${lib.basedir+dir}/${file}.json`);
    // console.log(lib.basedir);
    fs.open(`${lib.basedir+dir}/${file}.json`,'wx',(err,fd)=>{
        console.log(fd);
        if(!err && fd){
            let stringData=JSON.stringify(data);
            // write data to file and then close file
            fs.writeFile(fd,stringData,(err2)=>{
                if(!err2){
                    fs.close(fd,(err3)=>{
                        if(!err3){
                            callback(false)
                        }
                        else{
                            callback(err3)
                        }
                    })
                }
                else{
                    callback(err2)
                }
            })
        }
        else{
            callback(err)
        }
    })
}

// Read File 
lib.read=(dir,file,callback)=>{
    fs.readFile(`${lib.basedir+dir}/${file}.json`,'utf8',(err,data)=>{
        if(!err){
            callback(data)
        }
        else{
            callback("Error file don't read!")
        }
    })
}

// Updata file 
lib.update=(dir,file,data,callback)=>{
    fs.open(`${lib.basedir+dir}/${file}.json`,'r+',(err,fd)=>{
        const stringData=JSON.stringify(data);
        fs.ftruncate(fd,(err)=>{
            if(!err){
                fs.writeFile(fd,stringData,(err)=>{
                    if(!err){
                        fs.close(fd,(err)=>{
                            if(!err){
                                callback(false)
                            }
                            else{
                                callback(err)
                            }
                        })
                    }
                    else{
                        callback(err)
                    }
                })
            }
            else{
                callback(err)
            }
        })
    })
}

// export module 
module.exports=lib;
