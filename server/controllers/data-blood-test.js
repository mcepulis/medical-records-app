import { dbase } from '../index.js';

export async function allBloodTests(req, res) {
    try {
        const connection = await dbase();
        const [rows] = await connection.query(`SELECT * FROM blood_test`);
        console.log(rows);
        res.status(200).json(rows);
        connection.close();
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function BloodTest(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const sql = `SELECT * FROM blood_test WHERE ID = ?`;
      const [rows] = await connection.query(sql, [id]);
      console.log(rows);
      res.status(200).json(rows);
      connection.close();
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function addBloodTest(req, res) {
  try {
      const connection = await dbase();
      const { user_id, hemoglobin, white_blood_cells, platelets, hematocrit, glucose, cholesterol } = req.body;
      const sql = `INSERT INTO blood_test (user_id, hemoglobin, white_blood_cells, platelets, hematocrit, glucose, cholesterol) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const data = [user_id, hemoglobin, white_blood_cells, platelets, hematocrit, glucose, cholesterol];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      await connection.end(); 
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function editBloodTest(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const { user_id, hemoglobin, white_blood_cells, platelets, hematocrit, glucose, cholesterol } = req.body;
      const sql = `UPDATE blood_test SET user_id = ?, hemoglobin = ?, white_blood_cells = ?, platelets = ?, hematocrit = ?, glucose = ?, cholesterol = ? WHERE id = ?`;
      const data = [user_id, hemoglobin, white_blood_cells, platelets, hematocrit, glucose, cholesterol, id];
      const [rows] = await connection.query(sql, data);
      console.log(rows);
      res.status(200).json(rows);
      await connection.end(); 
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteBloodTest(req, res) {
  try {
      const connection = await dbase();
      const { id } = req.params;
      const sql = `DELETE FROM blood_test WHERE id = ?`;
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