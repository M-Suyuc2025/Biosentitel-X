import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection(): Promise<void> {
    try {
        const conection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos.');
        conection.release();
    } catch (error) {
        const err = error as Error;
        console.error('Error al conectar a la base de datos:', err.message);
    }
}

testConnection();

export default pool;