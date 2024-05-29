import { useState, useEffect } from "react";
import styles from './BloodTest.module.css';

export function BloodTest() {
    const [data, setData] = useState([]);
    const [hemoglobin, setHemoglobin] = useState("");
    const [white_blood_cells, setWhiteBloodCells] = useState("");
    const [platelets, setPlatelets] = useState("");
    const [hematocrit, setHematocrit] = useState("");
    const [glucose, setGlucose] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [error, setError] = useState(null);

    useEffect (() => {
    const fetchData = async () => {
       try {
        const res = await fetch("http://localhost:3555/data/blood-test");
        const data = await res.json();
        setData(data);
     } catch (err) {
        setError(err.message);
     }
    }
    fetchData();
}, [glucose]);

    const handleHemoglobinChange = (e) => {
        setHemoglobin(e.target.value);
    };

    const handleWhiteBloodCellsChange = (e) => {
        setWhiteBloodCells(e.target.value);
    };

    const handlePlateletsChange = (e) => {
        setPlatelets(e.target.value);
    };

    const handleHematocritChange = (e) => {
        setHematocrit(e.target.value);
    };

    const handleGlucoseChange = (e) => {
        setGlucose(e.target.value);
    };

    const handleCholesterolChange = (e) => {
        setCholesterol(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user_id = 1;
            const res = await fetch("http://localhost:3555/data/blood-test/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    hemoglobin,
                    white_blood_cells,
                    platelets,
                    hematocrit,
                    glucose,
                    cholesterol,
                    date: new Date().toLocaleString()
                })
            });
      if (!res.ok) {
        throw new Error('Failed to submit data');
      }
        setHemoglobin("");
        setWhiteBloodCells("");
        setPlatelets("");
        setHematocrit("");
        setGlucose("");
        setCholesterol("");
        } catch (err) {
            setError(err.message);
        }
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2>Enter General Blood Test Results</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="hemoglobin">Hemoglobin:</label>
                        <input
                            type="text"
                            id="hemoglobin"
                            value={hemoglobin}
                            onChange={handleHemoglobinChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="whiteBloodCells">White Blood Cells:</label>
                        <input
                            type="text"
                            id="white_blood_cells"
                            value={white_blood_cells}
                            onChange={handleWhiteBloodCellsChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="platelets">Platelets:</label>
                        <input
                            type="text"
                            id="platelets"
                            value={platelets}
                            onChange={handlePlateletsChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="hematocrit">Hematocrit:</label>
                        <input
                            type="text"
                            id="hematocrit"
                            value={hematocrit}
                            onChange={handleHematocritChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="glucose">Glucose:</label>
                        <input
                            type="text"
                            id="glucose"
                            value={glucose}
                            onChange={handleGlucoseChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="cholesterol">Cholesterol:</label>
                        <input
                            type="text"
                            id="cholesterol"
                            value={cholesterol}
                            onChange={handleCholesterolChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
            <div className={styles.resultsContainer}>
                <h2>Data Records</h2>
                <div className={styles.resultsTableWrapper}>
                    <table className={styles.resultsTable}>
                        <thead>
                            <tr>
                                <th>Hemoglobin</th>
                                <th>White Blood Cells</th>
                                <th>Platelets</th>
                                <th>Hematocrit</th>
                                <th>Glucose</th>
                                <th>Cholesterol</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((test, index) => (
                                <tr key={index}>
                                    <td>{test.hemoglobin}</td>
                                    <td>{test.white_blood_cells}</td>
                                    <td>{test.platelets}</td>
                                    <td>{test.hematocrit}</td>
                                    <td>{test.glucose}</td>
                                    <td>{test.cholesterol}</td>
                                    <td>{test.created_on}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
