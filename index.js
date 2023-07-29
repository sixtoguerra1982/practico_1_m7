const express = require("express");
const app = express();

const { allStudents, searchStudent, deleteStudent, updateStudent, createStudent } = require("./model/student");

require("dotenv").config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Consultar los estudiantes registrados.
app.get("/allstudents", async (req, res) => {
  // CLIENT DE CONEXION

  try {
    const students = await allStudents();
    res.json(students.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Consultar estudiante por rut. 
app.get("/search/:rut", async (req, res) => {
  let rut = req.params.rut;
  try {
    const student = await searchStudent(rut);
    if (student.rows){
      res.json(student.rows);
    } else {
      res.send(student);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Eliminar el registro de un estudiante.

app.get("/delete/:rut", async (req, res) => {
  let rut = req.params.rut;
  try {
    const student = await deleteStudent(rut);
    if (student.rows){
      res.json({response: student.rows[0] , message: 'Efectivamente Eliminado de DB'});
    } else {
      res.send(student);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE
// localhost:3000/update/xx.xxx.xxx-x?nombre=juanito&nivel=newnivel&curso=cursomodificado
app.get("/update/:rut", async (req, res) => {
  let rut = req.params.rut;
  let nombre = req.query.nombre;
  let nivel = req.query.nivel;
  let curso = req.query.curso;

  try {

    const student = await updateStudent(rut, nombre, nivel, curso);

    if (student.rows){
      res.json({response: student.rows[0] , message: 'Efectivamente Actualizado'});
    } else {
      res.send(student);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
});

// CREATE
// localhost:3000/create?rut=xx.xxx.xxx-x&nombre=nuevo estudiante&nivel=nivelnew&curso=27js
app.get("/create", async (req, res) => {
  let rut = req.query.rut;
  let nombre = req.query.nombre;
  let nivel = req.query.nivel;
  let curso = req.query.curso;

  try {

    const student = await createStudent(rut, nombre, nivel, curso);

    if (student.rows){
      res.json({response: student.rows[0] , message: 'Efectivamente Creado'});
    } else {
      res.send(student);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
