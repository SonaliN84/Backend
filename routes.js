const fs=require('fs')
const requestHandler=(req,res)=>{
    if(req.url==='/'){
        return fs.readFile('message.txt',{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log(err)
        }
        res.write(`<html><body>${data}<form action='/message' method='POST'><input type='text' name='name'/><button type='submit'>send</button></form></body></html>`)
        return res.end();
    
       })
       
        }
        else if(req.url==='/message' && req.method==='POST')
        {    
            const body=[];
            req.on('data',(chunk)=>{
            body.push(chunk)
            console.log(body)
            })
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody)
            const message=parsedBody.split("=")[1]
            fs.writeFile('message.txt',message,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                
                return res.end();
            });
            
        })
           
        }
        else if(req.url==='/home'){
            res.write("<html><body><h1>HOME</h1></body></html>")  
            return res.end(); 
        }
        else if(req.url==='/about')
        {
            res.write("<html><body><h1>ABOUT</h1></body></html>") 
            return res.end();  
        }
        res.write("<html><body><h1>hey,welcome</h1></body></html>")
        res.end();
}

// module.exports={
//     handler:requestHandler,
//     someText:'some text'

// }
// module.exports.handler=requestHandler;
// module.exports.someText='some text';

exports.handler=requestHandler;
exports.someText='some text';
   