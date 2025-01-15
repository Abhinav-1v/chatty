const {Router}=require('express');
const { checkauth } = require('../lib/utils');
const {getusersforsidebar, getmessages, sendmessage} = require('../controllers/messagecontrol');

const router=Router();

router.get('/',checkauth,getusersforsidebar);
router.get('/:id',checkauth,getmessages);

router.post('/send/:id',checkauth,sendmessage)

module.exports=router;