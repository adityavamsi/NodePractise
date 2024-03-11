const fs = require("fs");

function logResReq(){
    return (req,res,next)=>{
        fs.appendFile(
            "log.txt",
            `\n${Date.now()} : ${req.path} , ${req.method}\n`,
            (data,err)=>{
            next();
            }
        )
    };
};

module.exports = {
    logResReq
}