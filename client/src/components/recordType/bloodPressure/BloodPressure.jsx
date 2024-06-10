import { useState, useEffect } from "react";
import styles from './BloodPressure.module.css';

export function BloodPressure() {
   //  const { id } = useParams();
    const [data, setData] = useState([]);
    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");
    const [pulse, setPulse] = useState("");
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3555/data/blood-pressure');
                const data = await res.json();
                setData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const handleSystolic = (e) => {
        setSystolic(e.target.value);
    }

    const handleDiastolic = (e) => {
        setDiastolic(e.target.value);
    }

    const handlePulse = (e) => {
        setPulse(e.target.value);
    }

    const handleEdit = (id) => {
        const item = data.find(reading => reading.id === id);
        if (item) {
            setSystolic(item.systolic);
            setDiastolic(item.diastolic);
            setPulse(item.pulse);
            setEditId(id);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3555/data/blood-pressure/delete/` + id, {
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
      try {
          const user_id = 1;
          const body = {
              user_id,
              systolic,
              diastolic,
              pulse,
              date: new Date().toLocaleString()
          };
  
          let res;
          if (editId !== null) {
              res = await fetch(`http://localhost:3555/data/blood-pressure/edit/` + editId, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
              });
              if (!res.ok) {
                  throw new Error('Failed to update data');
              }
              setEditId(null);
          } else {
              res = await fetch('http://localhost:3555/data/blood-pressure/add', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
              });
              if (!res.ok) {
                  throw new Error('Failed to submit data');
              }
          }

          const updatedRes = await fetch('http://localhost:3555/data/blood-pressure');
          const updatedData = await updatedRes.json();
          setData(updatedData);
  
          setSystolic('');
          setDiastolic('');
          setPulse('');
      } catch (err) {
          setError(err.message);
      }
  };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2>Enter Blood Pressure Results</h2>
                {error && <p>Error: {error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="systolic">Systolic:</label>
                        <input
                            type="number"
                            id="systolic"
                            value={systolic}
                            onChange={handleSystolic}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="diastolic">Diastolic:</label>
                        <input
                            type="number"
                            id="diastolic"
                            value={diastolic}
                            onChange={handleDiastolic}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="pulse">Pulse:</label>
                        <input
                            type="number"
                            id="pulse"
                            value={pulse}
                            onChange={handlePulse}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {editId !== null ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
            <div className={styles.resultsContainer}>
                <h2>Data Records</h2>
                <div className={styles.resultsTableWrapper}>
                    <table className={styles.resultsTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Systolic</th>
                                <th>Diastolic</th>
                                <th>Pulse</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                           {data.map((reading) => (
                              <tr key={reading.id}>
                                    <td>{new Date(reading.created_on).toLocaleString('en-US')}</td>
                                    <td>{reading.systolic}</td>
                                    <td>{reading.diastolic}</td>
                                    <td>{reading.pulse}</td>
                                    <td>
                                       <button onClick={() => handleEdit(reading.id)}>&nbsp;✎&nbsp;</button>
                                       <button onClick={() => handleDelete(reading.id)}>&nbsp;&nbsp;🗑&nbsp;</button>
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
