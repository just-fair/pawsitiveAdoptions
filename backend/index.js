const express = require('express');
const mongoose= require('mongoose');
const cors= require('cors');
require('dotenv').config();
const route= require('./Routes/route');

const app=express();

app.use(express.json({limit:'10mb'}));
app.use(cors());
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
});


app.use('/pawsitiveadoptions', route);




const connectAndListen=async()=>{
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(process.env.PORT, ()=>{
        console.log("Connected and listening");
    })    
}

connectAndListen();