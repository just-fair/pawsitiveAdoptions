const mongoose= require('mongoose');

const dogsSchema=mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    image:{
        data:Buffer,
        contentType: String
    },
    breed:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    age:{
        type:String,
        require:true
    },
    personality:{
        type:String,
        require:true
    },
    height:{
        type:Number,
        required: true
    },
    weight:{
        type:Number,
        required:true
    },
    numOfReq:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=Dogs=mongoose.model("Dogs", dogsSchema);