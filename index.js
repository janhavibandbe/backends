const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mobilesRouter = require('./routes/mobiles');

const app = express();  //blank app

app.use(express.json());  //middleware
app.use(cors('*'));  //middleware
app.use('/api/mobiles', mobilesRouter);  //middleware

app.listen(process.env.PORT, '0.0.0.0', ()=>{
    console.log('server started at port '+process.env.PORT+'....');
});   //middleware