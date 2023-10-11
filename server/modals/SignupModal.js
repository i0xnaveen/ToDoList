const mongoose=require("mongoose");
const SignupDetail=new mongoose.Schema({
    Email:{
        type:String,
        required:true,
    },
    Username:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    }
});
const signupmodal=mongoose.model("SignupInfo",SignupDetail);
module.exports=signupmodal