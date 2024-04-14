const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/URL_Shortener');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

const URL_Shortener=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortenUrl:{
        type:String,
        required:true
    }
})

const collection=mongoose.model("URL_Shortener",URL_Shortener)

module.exports=collection;