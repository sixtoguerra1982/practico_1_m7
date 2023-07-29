const { pool } = require("../utils/conexion");

const allStudents = async () => {
  try {
    // LISTAR TODOS LOS ESTUDIANTES
    const query = { text: "SELECT rut, nombre, curso, nivel FROM student" };
    //  *1) conectarme a la BD;
    const client = await pool.connect();
    //  *2) Realiza la peticion a la BD
    const students = await client.query(query);
    console.log("students:", students);
    // 3) Cierra la conexion
    client.release();
    return students;
  } catch (err) {
    console.log("err.message:", err.message);
    console.log("err.stack:", err.stack);
    client.release();
    return [];
  }
};

const searchStudent = async (rut) => {
  try {
    // BUSCAR ESTUDIANTE POR RUT
    //  *1) pool query
    const query = {
      text: "SELECT rut, nombre, curso, nivel FROM student WHERE rut= $1",
      values: [rut],
    };
    const result = await pool.query(query);
    console.log(`Busqueda de estudiante: ${rut}`, result);
    if (result.rows.length > 0) {
      return result;
    } else {
      return { message: `Rut ${rut} ,no encontrado` };
    }
  } catch (err) {
    console.log("err.message:", err.message);
    console.log("err.stack:", err.stack);
    return [];
  }
};


const deleteStudent = async (rut) => {
  // BUSCAR ESTUDIANTE POR RUT para ELIMINAR
    //  *1) pool query
    try {
      const query = {
        text: "DELETE FROM student WHERE rut= $1 RETURNING *",
        values: [rut],
      };
  
      const result = await pool.query(query);
      console.log(`Eliminar estudiante: ${rut}`, result);
      if (result.rows.length > 0) {
        return result;
      } else {
        return { message: `Rut ${rut} ,no encontrado, para eliminar` };
      }  
    } catch (error) {
      console.log("err.message:", error.message);
      console.log("err.stack:", error.stack);
      return [];
    }
}

const updateStudent = async (rut, nombre, nivel, curso) => {
  // BUSCAR ESTUDIANTE POR RUT para ACTUALIZAR
    //  *1) pool query
    try {
      const query = {
        text: "UPDATE student SET nombre = $2, nivel = $3, curso = $4 WHERE rut= $1 RETURNING *",
        values: [rut,nombre,nivel, curso]
      };
  
      const result = await pool.query(query);
      console.log(`UPDATE estudiante: ${rut}`, result);
      if (result.rows.length > 0) {
        return result;
      } else {
        return { message: `Rut ${rut} ,no encontrado, para actualizar` };
      } 
    } catch (error) {
      console.log("err.message:", error.message);
      console.log("err.stack:", error.stack);
      return [];
    }
}

const createStudent = async (rut, nombre, nivel, curso) => {
  // CREAR ESTUDIANTE
    //  *1) pool query
    try {
      const query = {
        text: "INSERT INTO student(rut,nombre,nivel,curso) VALUES ($1,$2,$3,$4) RETURNING *",
        values: [rut,nombre,nivel, curso]
      };
  
      const result = await pool.query(query);
      console.log(`Nuevo estudiante: ${rut}`, result);
      if (result.rows.length > 0) {
        return result;
      } else {
        return { message: `Registro Creado` };
      } 
    } catch (error) {
      console.log("err.message:", error.message);
      console.log("err.stack:", error.stack);
      return [];
    }
}


module.exports = { allStudents, searchStudent, deleteStudent, updateStudent, createStudent };
