const {Router}=require('express');
const { signup, login, updateprofile,checker } = require('../controllers/authcontrol');
const { checkauth } = require('../lib/utils');


const router=Router();
router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',(Req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({message:'Logged out successfully!!'})
});

router.put('/updateprofile',checkauth,updateprofile);

router.get('/check',checkauth,checker);

module.exports=router;