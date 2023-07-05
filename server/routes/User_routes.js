const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authorization = require('../middleware/authorization');
const secretKey = process.env.SECRET

router.get('/getAllStudents',authorization,async(req,res)=>{
    try{
        const students = await User.find({isAdmin:false});
        res.send(students);
    }catch(err){
        res.status(400).json({message:err})
    }
});

router.post('/getStudentByIds',async(req,res)=>{
    const {user_ids} = req.body;
     console.log(user_ids);
    try{
        const students = await Promise.all(user_ids.map(async(user_id)=>{
            const student = await User.findOne({_id:user_id},{password:0,isAdmin:0});
            // console.log(student)
            return (student?  student :null)
        }))
        res.send(students);
    }catch(err){
        console.log(err)
        res.status(400).json({message:err})
    }
})

router.post('/addUser',authorization,async(req,res)=>{
    const {name,email,mobile,registration_no,password} = req.body;
    if(!name || !email || !mobile || !registration_no || !password )
    {
        return res.status(422).json({error: "plz fill the field properly"})
    }
    try{
        const userExist = await User.findOne({ registration_no: registration_no })
        if(userExist) {
            return res.status(422).json({error: "Student already exist"});
        } else {
            const student = new User({name,email,mobile,registration_no,password});
        //hashing password
        await student.save();
        
        res.status(201).json({message: "user registered sucessfully"});
        }
    }catch(err){
        res.status(400).json({
            message:err
        });
    }
});

router.post('/login',async(req,res)=>{
    const {registration_no,password} = req.body;
    if(!registration_no || !password){
        return res.status(422).json({message:"Please fill the fields properly.."});
    }
    try{
        const user = await User.findOne({registration_no: registration_no});
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            if(isMatch){

                 const accessToken = await jwt.sign({userId : user.id,isAdmin: user.isAdmin,name: user.name},secretKey);

                 res.cookie("jwtoken",accessToken,{
                    expires:new Date(Date.now()+25892000000),
                    httpOnly: true
                 });
                 const UserData = {_id:user._id,email:user.email,name:user.name,mobile:user.mobile,registration_no:user.registration_no,isAdmin:user.isAdmin}
                res.status(200).json({message:"login successful..",user:UserData})
            }else{
                res.status(422).json({message:"Invalid credentials..."})
            }
        }else{
            res.status(422).json({message:"Invalid Credentials.."})
        }
    }catch(err){

    }
});

router.get('/rootUser',authorization,async(req,res)=>{
    const userId = req.userId;
    const resp = await User.findOne({_id:userId},{password:0,_id:0});
    // console.log(resp)
    res.send(resp);
})

router.get('/logout', authorization ,(req,res) => {
    //  console.log('Hello my About');
    // res.send(`Hello About world from the server`)
    res.clearCookie('jwtoken',{path:"/"})
    res.status(200).send("User Logout");
});

router.post('/updateUser',authorization,async(req,res)=>{
    const userData = req.body;
    try{
        const user = await User.findOne({registration_no : userData.registration_no});
        (user.name = userData.name),
        (user.email = userData.email),
        (user.mobile = userData.mobile),
        (user.registration_no = userData.registration_no),
        (user.password = userData.password);
        await user.save();
        res.send("user updated successfully...");
    }catch(err){
        console.log(err);
    }
});

router.post('/deleteUser',authorization,async(req,res)=>{
    const userId = req.body;
    try{
        await User.findOneAndDelete({_id: userId._id});
        res.send("user deleted successfully..")
    }catch(err){
        res.status(400).json({message:err});
    }
 })

module.exports = router;