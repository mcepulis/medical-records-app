import { dbase } from '../index.js';

export async function allVisits(req, res) {
    try {
        const connection = await dbase();
        const [rows] = await connection.query(`SELECT * FROM visits`);
        console.log(rows);
        res.status(200).json(rows);
        connection.close();
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addVisit(req, res) {
  try {
      const connection = await dbase();
      const { user_id, visit_time, institution, cabinet, doctor, specialty } = req.body;
      const sql = `INSERT INTO visits (user_id, visit_time, institution, cabinet, doctor, specialty) VALUES (?, ?, ?, ?, ?, ?)`;
      const data = [user_id, visit_time, institution, cabinet, doctor, specialty];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      await connection.end(); 
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function editVisit(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const { user_id, visit_time, institution, cabinet, doctor, specialty } = req.body;
      const sql = `UPDATE visits SET user_id = ?, visit_time = ?, institution = ?, cabinet = ?, doctor = ?, specialty = ? WHERE id = ?`;
      const data = [user_id, visit_time, institution, cabinet, doctor, specialty, id];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      await connection.end(); 
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteVisit(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const sql = `DELETE FROM visits WHERE id = ?`;
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

export async function Visit(req, res) {
  try {
      const connection = await dbase();
      const { userId } = req.params;
      const sql = `SELECT * FROM visits WHERE user_id = ?`;
      const data = [userId];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      connection.close();
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}