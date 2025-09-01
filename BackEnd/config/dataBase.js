import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// charge les variables d'environnement du dossier BackEnd/config
dotenv.config({ path: './BackEnd/config/.env' });

const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || undefined,
	waitForConnections: true,
	connectionLimit: 10,
	namedPlaceholders: true,
});

/**
 * Test connection to DB by acquiring a connection and running a simple query
 */
export async function connectTest() {
	let conn;
	try {
		conn = await pool.getConnection();
		await conn.ping();
		// simple query to ensure DB is responsive
		await conn.query('SELECT 1');
		return true;
	} finally {
		if (conn) try { conn.release(); } catch (e) { /* ignore release errors */ }
	}
}

export default pool;
