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
    // read file 
    fs.readFile(`${lib.basedir+dir}/${file}.json`,'utf8',(err,data)=>{
        // console.log("hl",data);
        callback(err,data)
    })
}

// Updata file 
lib.update=(dir,file,data,callback)=>{
    // open file 
    fs.open(`${lib.basedir+dir}/${file}.json`,'r+',(err,fd)=>{
        if(!err && fd){
            const stringData=JSON.stringify(data);
        // empty file 
        fs.ftruncate(fd,(err)=>{
            if(!err){
                // update file 
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
       
        }
        else {
            console.log(`Error updating. File may not exist`);
        }
    })
}

// Delete File 
lib.delete=(dir,file,callback)=>{
    // unlinked file 
    fs.unlink(`${lib.basedir+dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false)
        }else {
            callback(err)
        }
    })
}

// all file list 
lib.list=(dir,callback)=>{
    fs.readdir(`${lib.basedir+dir}`,(err,fileNames)=>{
        if(!err && fileNames && fileNames.length>0){
            let trimFileNames=[];
            fileNames.forEach(fileName=>{
                trimFileNames.push(fileName.replace('.json',''));
            })
            callback(false,trimFileNames)
        }else{
            callback("Error found!")
        }
    })
}

// export module 
module.exports=lib;
