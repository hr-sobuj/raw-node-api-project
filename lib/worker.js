/*
Title:Row Node API Project
Description : This is row node project
Author: Habibur Rahman Sobuj
Date: 17/2/2022
*/

// Dependencies
const data=require('./data');
const http=require('http');
const https=require('https');
const url=require('url')
const {parseJSON}=require('../helper/utilities');
const {sendSMS}=require('../helper/notification')
// App Object -Module Scaffoling
const workers = {};

let checkOutCome={
    error:false,
    responseCode:false,
}
let markCheckout=false;
// msg send 
workers.alertSendToUser=(orginalCheckData)=>{
    let msg=`Alert: your check for  ${newOrginalData.method}  ${newOrginalData.protocol}://${newOrginalData.url} is currently ${newOrginalData.status}`;

    sendSMS(newOrginalData.phone,msg,(bools)=>{
        if(!bools){
            console.log("Message send successfully!");
        }else{
            console.log('Message not send!');
        }
    })

}
// process 
workers.processWorker=(orginalCheckData,checkOutCome)=>{
    let state=!checkOutCome.error && checkOutCome.responseCode && orginalCheckData.successCodes.indexOf(checkOutCome.responseCode)?'up':'down';

    let alertwanted=orginalCheckData.lastCheck && orginalCheckData.state!==state?true:false;

    let newOrginalData=orginalCheckData;
    newOrginalData.state=state;
    newOrginalData.lastCheck=Date.now();
    data.update('check',newOrginalData.checkId,newOrginalData,(err)=>{
        if(!err){
            if(alertwanted){
                workers.alertSendToUser(newOrginalData);
            }else{
                console.log('Alert not need');
            }
        }else{
            console.log('Operation Failed!');
        }
    })
}
// performance 
workers.perform=(orginalCheckData)=>{
    let parseUrl=url.parse(`${orginalCheckData.protocol}://${orginalCheckData.url}`,true);
    let hostname=parseUrl.hostname;
    let path=parseUrl.path;

    const requestObj={
        protocol:`${orginalCheckData.protocol}:`,
        method:orginalCheckData.method.toUpper,
        hostname:hostname,
        path:path,
        timeout:orginalCheckData.timeOutSeconds*1000
    }

    const protocolToUse=orginalCheckData.protocol==='http'?http:https;

    let req=protocolToUse.request(requestObj,(res)=>{
        const statusCode=res.statusCode;
        checkOutCome.responseCode=statusCode;

        if(!markCheckout){
            workers.processWorker(orginalCheckData,checkOutCome);
            markCheckout=true
        }
    })

    req.on('error',(e)=>{

        checkOutCome={
            error:true,
            value:e,
        }

        if(!markCheckout){
            workers.processWorker(orginalCheckData,checkOutCome);
            markCheckout=true
        }
    })
    req.on('timeout',(e)=>{
        checkOutCome={
            error:true,
            value:"timeout",
        }
        if(!markCheckout){
            workers.processWorker(orginalCheckData,checkOutCome);
            markCheckout=true
        }
    })
    req.end();

}

// validation check data
workers.validateCheckData=(orginalCheckData)=>{
    let orginalData=orginalCheckData;
    // console.log(orginalData);
    if(orginalData && orginalData.checkId){
        orginalData.status=typeof(orginalData.status)==='string' && ['up','down'].indexOf(orginalData.status)?orginalData.status:'down';

        orginalData.lastCheck=typeof(orginalData.lastCheck)==='number' && orginalData.lastCheck>0?orginalData.status:false;

        workers.perform(orginalData);

    }else{
        console.log("Information is wrong.");
    }
}

workers.gatherAllCheck=()=>{
    data.list('check',(err,checks)=>{
        if(!err && checks && checks.length>0){
            checks.forEach(check => {
                data.read('check',check,(err,orginalCheckData)=>{
                    if(!err && data){
                        // check validation 
                        workers.validateCheckData(parseJSON(orginalCheckData))
                    }else{
                        console.log("File Not found!");
                    }
                })
            });
        }else{
            console.log("check data not found!");
        }
    })
};

workers.loop=()=>{
    setInterval(()=>{
        workers.gatherAllCheck();
    },1000)
}
// initialization 
workers.init=()=>{
    workers.gatherAllCheck();
    workers.loop();
}
// export 
module.exports=workers;
