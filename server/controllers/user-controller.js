import { dbase } from '../index.js';
import { v4 as uuidv4 } from 'uuid'; 

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

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const connection = await dbase();
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;
        const [dbResponse] = await connection.execute(selectQuery, [email, password]);

        if (dbResponse.length !== 1) {
            return res.status(401).json({
                message: 'Invalid credentials',
                loggedIn: false,
            });
        }

        const user = dbResponse[0];
        const token = uuidv4();
        const insertQuery = `INSERT INTO login_token (user_id, token) VALUES (?, ?)`;
        await connection.execute(insertQuery, [user.id, token]);

        res.cookie('login_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({
            message: 'Login successful',
            loggedIn: true,
            user: user,
            token: token,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            message: 'Internal server error',
            loggedIn: false,
        });
    }
}
