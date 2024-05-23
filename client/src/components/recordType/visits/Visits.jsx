import { useState } from "react";
import styles from './Visits.module.css';

export function Visits() {
    const [visitDateTime, setVisitDateTime] = useState("");
    const [medicalInstitution, setMedicalInstitution] = useState("");
    const [cabinet, setCabinet] = useState("");
    const [doctor, setDoctor] = useState("");
    const [medicalSpecialty, setMedicalSpecialty] = useState("");
    const [visits, setVisits] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newVisit = {
            visitDateTime,
            medicalInstitution,
            cabinet,
            doctor,
            medicalSpecialty,
            date: new Date().toLocaleString()
        };
        setVisits([...visits, newVisit]);
        setVisitDateTime("");
        setMedicalInstitution("");
        setCabinet("");
        setDoctor("");
        setMedicalSpecialty("");
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
                            id="visitDateTime"
                            value={visitDateTime}
                            onChange={handleVisitDateTimeChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="medicalInstitution">Medical Institution:</label>
                        <input
                            type="text"
                            id="medicalInstitution"
                            value={medicalInstitution}
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
                            id="medicalSpecialty"
                            value={medicalSpecialty}
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
                            {visits.map((visit, index) => (
                                <tr key={index}>
                                    <td>{visit.visitDateTime}</td>
                                    <td>{visit.medicalInstitution}</td>
                                    <td>{visit.cabinet}</td>
                                    <td>{visit.doctor}</td>
                                    <td>{visit.medicalSpecialty}</td>
                                    <td>{visit.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
