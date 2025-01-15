const mongoose=require('mongoose');

const messageschema=mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    }
},{timestamps:true});

const MESSAGE=mongoose.model('messages',messageschema);

module.exports=MESSAGE;