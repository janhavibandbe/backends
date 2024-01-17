const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mobilesRouter = require('./routes/mobiles');
const studentsRouter = require('./routes/students');
const libraryRouter = require('./routes/library');

const app = express();  //blank app

app.use(express.json());  //middleware
app.use(cors('*'));  //middleware
app.use('/api/mobiles', mobilesRouter);  //middleware
app.use('/api/students', studentsRouter);
app.use('/api/library', libraryRouter);

app.listen(process.env.PORT, '0.0.0.0', ()=>{
    console.log('server started at port '+process.env.PORT+'....');
});   //middleware