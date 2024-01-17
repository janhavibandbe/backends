const express = require('express');
const db = require('../db');
const libraryRouter = express.Router();

function executeQuery(statement){
    return new Promise((resolve, reject) => {
        db.query(statement, (error,data) =>{
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        });
    });
};

// get all books
libraryRouter.get('/', async(request, response) => {
    try{
        const statement = `select * from library`;
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

//add new book
libraryRouter.post('/', async(request, response) => {
    try{
        const statement = `insert into library values(default, '${request.body.b_name}', '${request.body.author}', 
        '${request.body.publication}', ${request.body.edition}, ${request.body.copies_no}, 
        ${request.body.copies_issue}, default, ${request.body.shelf_no})`;
        const data = await executeQuery(statement);

        if(data.affectedRows===1){
            response.status(200).send({message: 'book added'});
        }
        else{
            response.status(400).send({message: 'something went wrong :('})
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

//get book by id
libraryRouter.get('/:id', async(request, response) => {
    try{
        const statement = `select * from library where b_id=${request.params.id}`;
        const data = await executeQuery(statement);

        if(data.length !== 0){
            response.status(200).send(data);
        }
        else{
            response.status(404).send({message: 'book not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

//update book
libraryRouter.put('/:id', async(request, response) => {
    try{
        const total = request.body.copies_no;
        const issued = request.body.copies_issue;
        const avlb = total-issued;
        const statement = `update library set b_name='${request.body.b_name}', author='${request.body.author}',
        publication='${request.body.publication}', edition=${request.body.edition}, copies_no=${request.body.copies_no},
        copies_issue=${request.body.copies_issue}, copies_avlb=${avlb}, shelf_no=${request.body.shelf_no} 
        where b_id=${request.params.id}`;
        const data = await executeQuery(statement);
       
        if(data.affectedRows === 1){
            response.status(200).send({message : "book updated"});
        }
        else{
            response.status(404).send({message: 'book not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

//delete book
libraryRouter.delete('/:id', async(request, response) => {
    try{
        const statement = `delete from library where b_id=${request.params.id}`;
        const data = await executeQuery(statement);

        if(data.affectedRows === 1){
            response.status(200).send({message: 'book deleted'});
        }
        else{
            response.status(404).send({message: 'book not found'});
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});


module.exports = libraryRouter;