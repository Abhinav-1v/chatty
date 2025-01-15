const USER = require("../models/usermodel");
const MESSAGE=require('../models/messagemodel');
const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId,io } = require("../lib/socket");

async function getusersforsidebar(req,res) {
    try{

        const loggeduserid=req.user._id;
        const allusers=await USER.find({_id:{$ne:loggeduserid}}).select('-password');
        return res.status(200).json(allusers);
    }
    catch(error){
        console.log('error in getusersforsidebar',error);
        return res.status(500).json({message:'Internal server error!!'});
    }
}

async function getmessages(req,res){
    try{

        const {id:otheruserid}=req.params;
        const userid=req.user._id;
        const messages = await MESSAGE.find({
            $or: [
                { senderid: userid, receiverid: otheruserid },
                { senderid: otheruserid, receiverid: userid }
            ]
        });
        return res.status(200).json(messages);
    }
    catch(error){
        console.log('error in getmessages',error);
        return res.status(500).json({message:'Internal server error!!'});
    }

}

async function sendmessage(req,res){
    try{

        const {text,image}=req.body;
        const {id:receiverid}=req.params;
        const senderid=req.user._id; 
         
        let imageurl;
        if(image){
            const uploadresponse=await cloudinary.uploader.upload(image);
            imageurl=uploadresponse.secure_url;
        }
        const newmessage=await MESSAGE.create({
            senderid,
            receiverid,
            text,
            image:imageurl
        });

        const ReceiverSocketId=getReceiverSocketId(receiverid);
        if(ReceiverSocketId){
            io.to(ReceiverSocketId).emit('newMessage',newmessage);
        }

        return res.status(201).json(newmessage);
    }
    catch(error){
        console.log('error in sendmessage',error);
        return res.status(500).json({message:'Internal server error!!'});
    }
}

module.exports={getusersforsidebar,getmessages,sendmessage};