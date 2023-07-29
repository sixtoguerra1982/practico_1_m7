const { pool } = require("../utils/conexion");

const allStudents = async () => {
  try {
    // LISTAR TODOS LOS ESTUDIANTES
    //  *1) conectarme a la BD;
    const query = { text: "SELECT rut, nombre, curso, nivel FROM student" };
    const client = await pool.connect();
    const students = await client.query(query);
    console.log("students:", students);
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
    // BUACAR ESTUDIANTE POR RUT
    //  *1) conectarme a la BD;
    const query = {
      text: "SELECT rut, nombre, curso, nivel FROM student WHERE rut= $1",
      values: [rut],
    };
    const result = await pool.query(query);
    console.log(`Busqueda de estudiante: ${rut}`, result);
    if (result.length > 0) {
      return result;
    } else {
      return [{ message: `Busqueda de estudiante: ${rut} ,no encontrado` }];
    }
  } catch (err) {
    console.log("err.message:", err.message);
    console.log("err.stack:", err.stack);
    return [];
  }
};

module.exports = { allStudents, searchStudent };
