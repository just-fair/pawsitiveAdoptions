const express = require('express');
const route=express.Router();
const {showDogs,
        upload, 
        addDog, 
        updateDog, 
        deleteDog, 
        showRequest, 
        addRequest, 
        editForm, 
        deleteForm}=require('../Controllers/controllers');

route.get('/dogs', showDogs);

route.post('/dogs', upload.single('image'), addDog);

route.patch('/dogs/:id', updateDog);

route.delete('/dogs/:id', deleteDog);

route.get('/forms/:nameOfDog', showRequest);

route.post('/form/:id', addRequest);

route.patch('/form/:id', editForm);

route.delete('/form/:id', deleteForm);

module.exports=route;