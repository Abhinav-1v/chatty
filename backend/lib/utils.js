const jwt=require('jsonwebtoken');
const USER = require('../models/usermodel');

const secret=process.env.JWT_SECRET;

function generatetoken(userdata, res) {
    const token = jwt.sign({ ...userdata }, secret, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Always set to true for cross-origin
        sameSite: 'None',
        // domain: 'https://chatty-bqe1.onrender.com', // Adjust this
        path: '/',
        maxAge: 3600000 // 1 hour in milliseconds
    });
    return token;
}
async function checkauth(req,res,next){
    try{

        const token=req.cookies?.token;
        if(!token)return res.status(401).json({message:'Unauthorized - No Token Provided'});
        const decoded=jwt.verify(token,secret);
        
        if(!decoded)return res.status(401).json({message:'Unauthorized - Invalid Token!!'});
        const user=await USER.findById(decoded._doc._id).select('-password');        
        if(!user) return res.status(404).json({message:'User Not Found!!'});
        
        req.user=user;
        next();
    }
    catch(e){
        console.log('Error in checkauth',e);
        return res.status(500).json({message:'Internal Server Error!!'});
    }
}



module.exports={generatetoken,checkauth};