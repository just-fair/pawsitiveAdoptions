const mongoose= require('mongoose');

const requestSchema= mongoose.Schema({

    lastName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    middleName: String,
    suffix: String,
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    emailAddress:String,
    reason:{
        type:String,
        required:true
    },
    nameOfDog:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports=Request=mongoose.model('Request', requestSchema);