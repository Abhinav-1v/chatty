const mongoose=require('mongoose');

async function connectdb(){
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('MongoDB connected'));
};

module.exports={connectdb};