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

export async function User(req, res) {
    try {
        const connection = await dbase();
        const { id } = req.params;
        const sql = `SELECT * FROM users WHERE ID = ?`;
        const [rows] = await connection.query(sql, [id]);
        console.log(rows);
        res.status(200).json(rows);
        await connection.end(); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addUser(req, res) {
    try {
        const connection = await dbase();
        const { name, email, password } = req.body;
        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const data = [name, email, password];
        const [rows] = await connection.query(sql, data);
        console.log(rows);
        res.status(200).json(rows);
        await connection.end(); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function editUser(req, res) {
    try {
        const connection = await dbase();
        const { id } = req.params;
        const { name, email, password } = req.body;
        const sql = `UPDATE users SET name=?, email=?, password=? WHERE id = ?`;
        const data = [name, email, password, id];
        const [rows] = await connection.query(sql, data);
        console.log(rows);
        res.status(200).json(rows);
        await connection.end(); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
    try {
        const connection = await dbase();
        const { id } = req.params;
        const sql = `DELETE FROM users WHERE id = ?`;
        const data = [id];
        const [rows] = await connection.query(sql, data);
        console.log(rows);
        res.status(200).json(rows);
        await connection.end(); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}