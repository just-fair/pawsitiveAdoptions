const { diskStorage } = require('multer');
const Dog=require('../Models/dogsModel');
const Request=require('../Models/requestModel');
const multer= require('multer');
const fs= require('fs');

const showDogs=async(req, res)=>{
    try{

        const dogs=await Dog.find({}).sort({createdAt:-1});
        
        if(!dogs) return res.json({message: "Cannot get dogs from data base"});

        console.log(dogs);
        return res.json(dogs);

    }catch(e){
        console.log(e.message);
    }
}

const upload= multer({
    storage:multer.memoryStorage()
})

const addDog=async(req, res)=>{
    try{

        const {name, breed, color, age, height, weight, personality}=req.body;

        const dog=await Dog.create({
            name:name,
            image:{
                data: fs.readFileSync("images/"+req.file.filename),
                contentType:'image/png'
            },
            breed:breed,
            color:color,
            age:age,
            personality:personality,
            height:height,
            weight:weight
  
        });

        if(!dog) return res.json("message: Cannot add a new dog");

        return res.json(dog);

    }catch(e){
        console.log(e.message);
    }
}

const updateDog=async(req, res)=>{
    try{
        const{id}=req.params;

        const dog=await Dog.findOneAndUpdate({_id:id},{...req.body});

        if(!dog) return res.json({message:"Cannot update"});

        return res.json(dog);

    }catch(e){
        console.log(e.message);
    }
}

const deleteDog=async(req, res)=>{
    try{
        const {id}= req.params;

        const dog=await Dog.findOneAndDelete({_id:id});

        if(!dog) return res.json({message:"Cannot delete dog"});

        return res.json(dog);
    }catch(e){
        console.log(e.message);
    }
}

const showRequest=async(req, res)=>{

    try{
        const {nameOfDog} = req.params;

        const request=await Request.find({nameOfDog: nameOfDog});

        if(!request) return res.json({message:"No request"});

        return res.json(request);

    }catch(e){
        console.log(e);
    }

}

const addRequest= async(req, res)=>{

    try{

        const {id}= req.params;
        const {lastName, firstName , middleName, suffix, reason, age, address, contact, emailAddress}= req.body;
        const dog=await Dog.findById({_id:id});

        if(!dog) console.log("Can't find the dog");

        const request=await Request.create({
            lastName:lastName,
            firstName:firstName,
            middleName:middleName,
            suffix:suffix,
            reason, reason,
            age:age,
            address:address,
            contact:contact,
            emailAddress:emailAddress,
            nameOfDog:dog.name,
            dogId:id
        });

        if(!request) return res.json({message:"Can't add request"});

        return res.json(request);

    }catch(e){
        console.log(e.message);
    }

}

const editForm=async(req, res)=>{
    try{
        const {id}=req.params;

        const form=await Request.findOneAndUpdate({_id:id}, {...req.body});

        if(!form) return res.json({message:"Cannot edit form"});

        return res.json(form);
    }catch(e){
        console.log(e.message);
    }
}

const deleteForm= async(req, res)=>{
    try{
        const {id} = req.params;

        const form = await Request.findOneAndDelete({_id:id});

        if(!form) return res.json({message:"Cannot delete form"});

        return res.json(form);

    }catch(e){
        console.log(e.message);
    }
}


module.exports={showDogs, 
                upload, 
                addDog, 
                updateDog, 
                deleteDog, 
                showRequest, 
                addRequest, 
                editForm, 
                deleteForm};