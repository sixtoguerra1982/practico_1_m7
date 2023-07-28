const express = require('express');
const app = express();

const { allStudents} = require('./model/student');

require('dotenv').config()
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/allstudents', async (req, res) => {
    // CLIENT DE CONEXION
    
    try {
        const students = await allStudents();
        res.json(students.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});