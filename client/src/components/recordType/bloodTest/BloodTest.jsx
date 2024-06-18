import { useContext, useState, useEffect } from "react";
import styles from './BloodTest.module.css';
import { GlobalContext } from "../../../context/GlobalContext.jsx";
import { useNavigate } from 'react-router-dom';

export function BloodTest() {
    const navigate = useNavigate();
    const { loginStatus, userId } = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [hemoglobin, setHemoglobin] = useState("");
    const [white_blood_cells, setWhiteBloodCells] = useState("");
    const [platelets, setPlatelets] = useState("");
    const [hematocrit, setHematocrit] = useState("");
    const [glucose, setGlucose] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!loginStatus) {
            console.log('User not logged in. Redirecting to login...');
            navigate('/');
        } else {
            fetchData();
        }
    }, [loginStatus, userId, navigate]);

    const fetchData = async () => {
       try {
        const res = await fetch(`http://localhost:3555/data/blood-test/${userId}`);
        const data = await res.json();
        setData(data);
     } catch (err) {
        setError(err.message);
    }
}

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

    const handleEdit = (id) => {
        const item = data.find(reading => reading.id === id);
        if (item) {
            setHemoglobin(item.hemoglobin);
            setWhiteBloodCells(item.white_blood_cells);
            setPlatelets(item.platelets);
            setHematocrit(item.hematocrit);
            setGlucose(item.glucose);
            setCholesterol(item.cholesterol);
            setEditId(id);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3555/data/blood-test/delete/` + id, {
                method: 'DELETE'
            });
            if (res.ok) {
                setData(data.filter(reading => reading.id !== id));
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to delete item');
            }
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginStatus || !userId) {
            console.error('User not logged in or userId is missing');
            return;
        }
        try {
            const body = {
                user_id: userId,
                hemoglobin,
                white_blood_cells,
                platelets,
                hematocrit,
                glucose,
                cholesterol,
                date: new Date().toLocaleString()
            };

            let res;
            if (editId !== null) {
                res = await fetch(`http://localhost:3555/data/blood-test/edit/` + editId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                if (!res.ok) {
                    throw new Error('Failed to submit data');
            }
            setEditId(null);
          } else {
            const res = await fetch("http://localhost:3555/data/blood-test/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
                if (!res.ok) {
                    throw new Error('Failed to submit data');
                }
            }
            const updatedRes = await fetch(`http://localhost:3555/data/blood-test/${userId}`);
            const updatedData = await updatedRes.json();
            setData(updatedData);
            setHemoglobin('');
            setWhiteBloodCells('');
            setPlatelets('');
            setHematocrit('');
            setGlucose('');
            setCholesterol('');
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
                            {data.map((reading) => (
                                <tr key={reading.id}>
                                    <td>{reading.hemoglobin}</td>
                                    <td>{reading.white_blood_cells}</td>
                                    <td>{reading.platelets}</td>
                                    <td>{reading.hematocrit}</td>
                                    <td>{reading.glucose}</td>
                                    <td>{reading.cholesterol}</td>
                                    <td>{new Date(reading.created_on).toLocaleString('en-US')}</td>
                                    <td>
                                        <button onClick={() => handleEdit(reading.id)}>✎</button>
                                        <button onClick={() => handleDelete(reading.id)}>🗑</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
