const mongoose=require('mongoose');


const userschema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:''
    }
},{timestamps:true}
);

const USER=mongoose.model('users',userschema);

module.exports=USER;