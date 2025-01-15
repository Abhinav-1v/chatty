const cloudinary = require('../lib/cloudinary');
const { generatetoken } = require('../lib/utils');
const USER=require('../models/usermodel');
const bcrypt=require('bcryptjs');


async function signup(req,res){
    const {fullname,email,password}=req.body;
    try {
        if(!fullname || !email ||!password) return res.status(400).json({message:'All fields are required!!'});

        if(password.length<6)return res.status(400).json({message:'Password must be atleast 6 characters!!'}); 

        const user=await USER.findOne({email})
        if(user) return res.status(400).json({message:'Email already exists!!'});

        const salt =await bcrypt.genSalt(10);
        const hashsedpw=await bcrypt.hash(password,salt);

        const newuser=await USER.create({
            fullname,
            email,
            password:hashsedpw
        });
        if(!newuser)return res.status(400).json({message:'Invalid User Data!!'});

        generatetoken(newuser,res);

        return res.status(201).json({
            _id:newuser._id,
            fullname:newuser.fullname,
            email:newuser.email,
            profilepic:newuser.profilepic
        });

    } catch (error) {
        console.log('error in signup',error);
        return res.status(500).json({message:'Internal Server Error'});
    }
};

async function login(req,res){
    const {email,password}=req.body;
    try {
        if(!email || !password)return res.status(400).json({messsage:'All fields are required!!'});

        const user=await USER.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid Credentials'});

        const checkpassword =await bcrypt.compare(password,user.password);
        if(!checkpassword) return res.status(400).json({message:'Invalid Credentials!!'});

        generatetoken(user,res);

        return res.status(201).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilepic:user.profilepic
        });
    } catch (error) {
        console.log('error in login',error);
        return res.status(500).json({message:'Internal Server Error!!'});
    }
}

async function updateprofile(req,res){
    try{
        const{profilepic}=req.body;
        if(!profilepic)return res.status(400).json({message:'Profile pic is required!!'});
        const uploadresponse= await cloudinary.uploader.upload(profilepic);
        const updateduser=await USER.findByIdAndUpdate(req.user._id,{profilepic:uploadresponse.secure_url},{new:true});
        return res.status(200).json(updateduser);
    }
    catch(error){
        console.log('error in uploadprofile',error);
        return res.status(500).json({message:'Internal server error!!'});
    }
}

function checker(req,res){
    try{
        res.status(200).json(req.user);
    }
    catch(e){
        console.log('error in checker',error);
        return res.status(500).json({message:'Internal server error!!'});
    }
}

module.exports={signup,login,updateprofile,checker};