const http=require('http');

const server=http.createServer((req,res)=>{
    console.log("sonali")
    console.log(req.url,req.method)
    // process.exit();
    res.setHeader('Content-Type','text/html')
    if(req.url==='/'){
    res.write("<html><body><h1>Hello</h1></body></html>")
    res.end();
    return ;
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
   
   
})

server.listen(3000);
