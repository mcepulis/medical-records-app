import { dbase } from '../index.js';

export async function allPressureTests(req, res) {
    try {
        const connection = await dbase();
        const [rows] = await connection.query(`SELECT * FROM blood_pressure`);
        console.log(rows);
        res.status(200).json(rows);
        connection.close();
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function PressureTest(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const sql = `SELECT * FROM blood_pressure WHERE ID = ?`;
      const [rows] = await connection.query(sql, [id]);
      console.log(rows);
      res.status(200).json(rows);
      connection.close();
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function addPressure(req, res) {
  try {
      const connection = await dbase();
      const { user_id, systolic, diastolic, pulse } = req.body;
      const sql = `INSERT INTO blood_pressure (user_id, systolic, diastolic, pulse) VALUES (?, ?, ?, ?)`;
      const data = [user_id, systolic, diastolic, pulse];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      await connection.end(); 
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function editPressure(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const { user_id, systolic, diastolic, pulse } = req.body;
      const sql = `UPDATE blood_pressure SET user_id = ?, systolic = ?, diastolic = ?, pulse = ? WHERE id = ?`;
      const data = [user_id, systolic, diastolic, pulse, id];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      await connection.end(); 
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function deletePressure(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const sql = `DELETE FROM blood_pressure WHERE id = ?`;
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
