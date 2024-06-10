import { useState, useEffect } from "react";
import styles from './UsersControl.module.css';

export function UsersPage() {
     const [data, setData] = useState([]);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3555/users');
                const data = await res.json();
                setData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3555/users/delete/` + id, {
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

    return (  
            <div className={styles.resultsContainer}>
                <h2>All Users</h2>
                <div className={styles.resultsTableWrapper}>
                    <table className={styles.resultsTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {data.map((reading) => (
                              <tr key={reading.id}>
                                    <td>{reading.name}</td>
                                    <td>{reading.email}</td>
                                    <td>{new Date(reading.created_on).toLocaleString('en-US')}</td>
                                    <td>
                                       <button onClick={() => handleDelete(reading.id)}>&nbsp;&nbsp;🗑&nbsp;</button>
                                    </td>
                              </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}
