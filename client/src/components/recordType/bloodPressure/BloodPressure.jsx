import { useState } from "react";
import styles from './BloodPressure.module.css';

export function BloodPressure() {
   const [systolic, setSystolic] = useState("");
   const [diastolic, setDiastolic] = useState("");
   const [pulse, setPulse] = useState("");
   const [readings, setReadings] = useState([]);

   const handleSystolic = (e) => {
      setSystolic(e.target.value);
   }

   const handleDiastolic = (e) => {
      setDiastolic(e.target.value);
   }

   const handlePulse = (e) => {
      setPulse(e.target.value);
   }

   const handleSubmit = (e) => {
     e.preventDefault();
     const newReading = {
        systolic,
        diastolic,
        pulse,
        date: new Date().toLocaleString()
     };
     setReadings([...readings, newReading]);
     setSystolic("");
     setDiastolic("");
     setPulse("");
   }

   return (
      <div className={styles.container}>
         <div className={styles.formContainer}>
            <h2>Enter Blood Pressure</h2>
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
            <h2>Everyday Results</h2>
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
                     {readings.map((reading, index) => (
                        <tr key={index}>
                           <td>{reading.date}</td>
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
