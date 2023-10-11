const mongoose=require("mongoose");
const express=require("express");
const app=express();
const cors=require('cors');

app.delete("/delete-task")
app.use(cors());
const signupmodal=require('./modals/SignupModal');
const listmodal=require('./modals/ListModal');
app.listen(3001,()=>{
    console.log("Server running on port 3001")
});
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const mongourl="mongodb+srv://naveen62113:1234@cluster0.k2hpbus.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongourl,{
    useNewUrlParser:true

}).then(()=>{console.log("Connected to database");})
.catch((e)=>console.log(e));
app.post("/signup",async(req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const signup=new signupmodal({Email:email,Username:username,Password:password});
    try{
        await signup.save();
        res.status(200).json({message:"Credentials Stored Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Failed"});
    }
});
app.post('/login',async(req,res)=>{
    const logem=req.body.email;
    const logpa=req.body.password;
    const result=await signupmodal.findOne({Email:logem,Password:logpa});
    if(result){
        res.json({exists:true});
    }else{
        res.json({exists:false});
    }
});
app.post('/add-tasks',async(req,res)=>{
    const todotask=req.body.task;
    const task=new listmodal({Tasks:todotask})
    try{
        await task.save();
        res.status(200).json({message:"Tasks stored successfully in database"});
    }
    catch(err){
     console.log(err);
    res.status(500).json({message:"Failed"});
}
});
app.post('/ret-tasks', async(req,res)=>{
    try{
        const tasks=await listmodal.find();
        res.json(tasks);
    }  catch(err){
        res.status(500).json({message:"Server Error"})
    }
})