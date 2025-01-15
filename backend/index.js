require('dotenv').config();
const express=require('express');
const { connectdb } = require('./lib/db');
const cookieParser = require('cookie-parser');
const cors=require('cors');

const PORT=process.env.PORT;
const authrouter=require("./routes/authroute");
const messagerouter=require('./routes/messageroute');
const { app, server } = require('./lib/socket');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true 
}));

connectdb();

app.get('/',(Req,res)=>{
    return res.send('123333');
})


app.use('/auth',authrouter);
app.use('/message',messagerouter);


server.listen(PORT,()=>console.log(`http://localhost:${PORT}`));