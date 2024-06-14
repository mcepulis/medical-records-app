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
    const data = req.body;
    const { email, password } = data;
    const connection = await dbase();

    try {
        const connection = await dbase();
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const [dbResponse] = await connection.execute(selectQuery, [email, password]);

        if (dbResponse.length === 0) {
            return res.send(JSON.stringify({
                message: 'Such user does not exist',
                loggedIn: false,
            }));
        } else if (dbResponse.length === 1) {
            const loginObj = dbResponse[0];
            console.log(loginObj);
            const token = uuidv4();
            const insertQuery = `INSERT INTO login_token (user_id, token) VALUES (?, ?)`;
            await connection.execute(insertQuery, [loginObj.id, token]);
            res.cookie('login_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.send(JSON.stringify({
                message: 'Login successful',
                loggedIn: true,
                user: loginObj 
            }));
        } else {
            res.send(JSON.stringify({
                message: 'Such user does not exist',
                loggedIn: false,
            }));
        }

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Could not find user',
            loggedIn: false,
        }));
    } finally {
        await connection.end();
    }
}