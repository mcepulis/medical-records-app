import { dbase } from '../index.js';

export async function allData(req, res) {
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

