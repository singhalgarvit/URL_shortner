const express=require("express");
const app=express();
const randomstring = require("randomstring");
const cors=require("cors");
const collection=require("./mongodb");
const PORT= 5000;

app.use(cors());

app.get("/",(req,res)=>{
    res.send("The Server is Connected.....");
})

app.post("/",async (req,res)=>{
    var url=req.headers.url;
    const string =randomstring.generate(9);
    var findIfexist=await collection.findOne({shortenUrl:string});
    if(findIfexist==null){
    var shortData=await collection.insertMany({url:url,shortenUrl:string});
    res.json(shortData);
    }
})

app.get('/:shrturl', async (req, res)=> {
    let shrturl=req.params.shrturl;
    let data= await collection.findOne({shortenUrl:shrturl});
    res.redirect(data.url);
});

app.listen(PORT,()=>{
    console.log(`the server is running on port no . ${PORT}`);
})