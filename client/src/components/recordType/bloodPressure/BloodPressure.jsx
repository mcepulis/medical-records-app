import { useState, useEffect } from "react";
import styles from './BloodPressure.module.css';

export function BloodPressure() {
   const [data, setData] = useState([]);
   const [systolic, setSystolic] = useState("");
   const [diastolic, setDiastolic] = useState("");
   const [pulse, setPulse] = useState("");
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
   }, [systolic]);

   const handleSystolic = (e) => {
      setSystolic(e.target.value);
   }

   const handleDiastolic = (e) => {
      setDiastolic(e.target.value);
   }

   const handlePulse = (e) => {
      setPulse(e.target.value);
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const user_id = 1; 
         const res = await fetch('http://localhost:3555/data/blood-pressure/add', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               user_id,
               systolic,
               diastolic,
               pulse,
               date: new Date().toLocaleString()
            })
         });
         if (!res.ok) {
            throw new Error('Failed to submit data');
         }
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
               <button type="submit" className={styles.submitButton}>Submit</button>
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
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((reading, index) => (
                        <tr key={index}>
                           <td>{reading.created_on}</td>
                           <td>{reading.systolic}</td>
                           <td>{reading.diastolic}</td>
                           <td>{reading.pulse}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
