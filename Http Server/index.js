const http = require('http');
const fs = require("fs");
const url = require('url');

const myServer = http.createServer((req,res)=>{
    if(req.url==='/favicon.ico') return res.end();
    const log = `New Request at: (${Date.now()}) on path ${req.url}\n`;
    const myUrl  = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("log.txt",log,(err,data)=>{
        const username = myUrl.query.myName;
        switch(myUrl.pathname){
            
            case '/':res.end(`<h1>Hiii ${username}. This is Home Page</h1>`);
            break;
            case'/about':res.end(`<h1>Hiii ${username}. This is About Page</h1>`);
            break;
            case '/contact': res.end(`<h1>Hiii ${username}. This is Contact Page</h1>`);
            break;
            default:res.end(`<h1>Hiii ${username}. Wrong path...404 not found</h1>`);
            break;
        }
    })
})
    

myServer.listen(4000,()=>console.log("Everything is good!"));
