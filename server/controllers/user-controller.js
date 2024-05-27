import { dbase } from '../index.js';

export async function allUsers(req, res) {
    try {
        const connection = await dbase();
        const [rows] = await connection.query('SELECT * FROM users');
        console.log(rows);
        res.status(200).json(rows);
        await connection.end(); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}