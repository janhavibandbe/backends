const express = require('express');
const db = require('../db');
const studentsRouter = express.Router();

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

// get all students
studentsRouter.get('/', async(request, response)=>{
    try{
        const statement = `select * from students`;
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

// add new student
studentsRouter.post('/', async(request, response)=>{
    try{
        const statement = `insert into students values(default, '${request.body.regno}',
        '${request.body.name}', '${request.body.dob}', '${request.body.gender}', 
        '${request.body.branch}', '${request.body.admission_year}', ${request.body.year}, 
        '${request.body.mobno}')`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows===1){
            response.status(200).send({message: 'student added'});
        }
        else{
            response.status(400).send({message: 'something went wrong'});
        }
    }
    catch(error){
        if(error.code === "ER_DUP_ENTRY"){
            response.status(500).send({message: "Duplicate register number or mobile number"});
        }
        else{
            response.status(400).send(error);
        }
    }
});


// get student by id
studentsRouter.get('/:id', async(request, response)=>{
    try{
        const statement = `select * from students where id=${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.length !==0){
            response.status(200).send(data);
        }
        else{
            response.status(404).send({message: 'Student not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

// update student
studentsRouter.put('/:id', async(request, response)=>{
    try{
        const statement = `update students set regno='${request.body.regno}',
        name='${request.body.name}', dob='${request.body.dob}', gender='${request.body.gender}', 
        branch='${request.body.branch}', admission_year='${request.body.admission_year}', 
        year=${request.body.year}, mobno='${request.body.mobno}'
        where id=${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows ===1){
            response.status(200).send({message : "Student's data updated"});
        }
        else{
            response.status(404).send({message: 'Student not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

// delete student
studentsRouter.delete('/:id', async(request, response)=>{
    try{
        const statement = `delete from students where id=${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows===1){
            response.status(200).send({message: 'Student deleted'});
        }
        else{
            response.status(404).send({message: 'student not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});


module.exports = studentsRouter;