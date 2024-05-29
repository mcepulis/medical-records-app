import { useState, useEffect } from "react";
import styles from './Visits.module.css';

export function Visits() {
    const [data, setData] = useState([]);
    const [visit_time, setVisitDateTime] = useState("");
    const [institution, setMedicalInstitution] = useState("");
    const [cabinet, setCabinet] = useState("");
    const [doctor, setDoctor] = useState("");
    const [specialty, setMedicalSpecialty] = useState("");
    const [error, setError] = useState("");

useEffect (() => {
    const fetchData = async () => {
        try {
        const res = await fetch('http://localhost:3555/data/visits');
        const data = await res.json();
        setData(data);
        } catch (err) {
            setError(err.message);
        }
    };
    fetchData();
   }, [visit_time]);


    const handleVisitDateTimeChange = (e) => {
        setVisitDateTime(e.target.value);
    };

    const handleMedicalInstitutionChange = (e) => {
        setMedicalInstitution(e.target.value);
    };

    const handleCabinetChange = (e) => {
        setCabinet(e.target.value);
    };

    const handleDoctorChange = (e) => {
        setDoctor(e.target.value);
    };

    const handleMedicalSpecialtyChange = (e) => {
        setMedicalSpecialty(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
        const user_id = 1
        const res = await fetch('http://localhost:3555/data/visits/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id,
                visit_time,
                institution,
                cabinet,
                doctor,
                specialty
            })
        });
        if (!res.ok) {
            throw new Error('Failed to submit data');
          }
        setVisitDateTime("");
        setMedicalInstitution("");
        setCabinet("");
        setDoctor("");
        setMedicalSpecialty("");
    } catch (err) {
        setError(err.message);
    }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2>Enter Visit Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="visitDateTime">Visit Date-Time:</label>
                        <input
                            type="datetime-local"
                            id="visit_time"
                            value={visit_time}
                            onChange={handleVisitDateTimeChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="medicalInstitution">Medical Institution:</label>
                        <input
                            type="text"
                            id="institution"
                            value={institution}
                            onChange={handleMedicalInstitutionChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="cabinet">Cabinet:</label>
                        <input
                            type="text"
                            id="cabinet"
                            value={cabinet}
                            onChange={handleCabinetChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="doctor">Doctor:</label>
                        <input
                            type="text"
                            id="doctor"
                            value={doctor}
                            onChange={handleDoctorChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="medicalSpecialty">Medical Specialty:</label>
                        <input
                            type="text"
                            id="specialty"
                            value={specialty}
                            onChange={handleMedicalSpecialtyChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
            <div className={styles.resultsContainer}>
                <h2>Visit Records</h2>
                <div className={styles.resultsTableWrapper}>
                    <table className={styles.resultsTable}>
                        <thead>
                            <tr>
                                <th>Visit Date-Time</th>
                                <th>Medical Institution</th>
                                <th>Cabinet</th>
                                <th>Doctor</th>
                                <th>Medical Specialty</th>
                                <th>Record Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((visit, index) => (
                                <tr key={index}>
                                    <td>{visit.visit_time}</td>
                                    <td>{visit.institution}</td>
                                    <td>{visit.cabinet}</td>
                                    <td>{visit.doctor}</td>
                                    <td>{visit.specialty}</td>
                                    <td>{visit.created_on}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
