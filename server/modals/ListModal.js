const mongoose=require('mongoose')
const ListDetail=new mongoose.Schema({
    Tasks:{
    type:String,
    required:true,
    },

})
const listmodal=mongoose.model("listinfo",ListDetail);
module.exports=listmodal