const path =require('path');
const rootDir=require('../util/path')

exports.contactusController=(req,res)=>{
    res.sendFile(path.join(rootDir,'Views','contact.html'))
}