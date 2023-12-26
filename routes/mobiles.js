const express = require('express');
const db = require('../db');
const mobilesRouter = express.Router();

function executeQuery(statement){
    return new Promise((resolve, reject) => {
        db.query(statement,(error, data)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        });
    });
};

// get all mobiles
mobilesRouter.get('/', async(request, response)=>{
    try{
        const statement = `select * from mobiles`;
        const data = await executeQuery(statement);
       
        if(data.length===0){
            response.status(404).send({message: 'data not found'});
        }
        else{
            response.status(200).send(data);
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

// add new mobile
mobilesRouter.post('/', async(request, response)=>{
    try{
        const statement = `insert into mobiles values(default, '${request.body.model}',
        '${request.body.company}', ${request.body.RAM}, ${request.body.storage}, 
        ${request.body.battery}, ${request.body.camera}, ${request.body.price})`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows===1){
            response.status(200).send({message: 'mobile added'});
        }
        else{
            response.status(400).send({message: 'something went wrong'});
        }
       
    }
    catch(error){
        response.status(400).send(error);
    }
});

// get mobile by id
mobilesRouter.get('/:id', async(request, response)=>{
    try{
        const statement = `select * from mobiles where id=${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.length !==0){
            response.status(200).send(data);
        }
        else{
            response.status(404).send({message: 'mobile not found'});
        }
       
    }
    catch(error){
        response.status(400).send(error);
    }
});

// update mobile
mobilesRouter.put('/:id', async(request, response)=>{
    try{
        const statement = `update mobiles set model='${request.body.model}', 
        company='${request.body.company}', RAM=${request.body.RAM}, 
        storage=${request.body.storage}, battery_mAh=${request.body.battery}, 
        camera_MP=${request.body.camera}, price=${request.body.price} 
        where id = ${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows===1){
            response.status(200).send({message: 'mobile updated'});
        }
        else{
            response.status(404).send({message: 'mobile not found'});
        }
       
    }
    catch(error){
        response.status(400).send(error);
    }
});

// delete mobile
mobilesRouter.delete('/:id', async(request, response)=>{
    try{
        const statement = `delete from mobiles where id=${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows===1){
            response.status(200).send({message: 'mobile deleted'});
        }
        else{
            response.status(404).send({message: 'mobile not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

module.exports = mobilesRouter;