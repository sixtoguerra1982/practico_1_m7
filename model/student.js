const { pool } = require('../utils/conexion');

const allStudents = async () => {
    try {
        // LISTAR TODOS LOS ESTUDIANTES
        //  *1) conectarme a la BD;
        const client = await pool.connect();
        const students = await client.query('SELECT rut, nombre, curso, nivel FROM student');
        console.log('students:', students);
        client.release();
        return students
    } catch (err) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        client.release();
        return [];
    }
}


module.exports = { allStudents }