import style from './User.module.css';
import mainLogo from '../../assets/images/main.webp';

export function User() {
    const medicalRecords = [
        { id: 1, name: 'Blood Pressure' },
        { id: 2, name: 'Blood Test' },
        { id: 3, name: 'Pulse Test' },
    ];

    const handleClick = (recordId) => {
        console.log('Clicked on record with ID:', recordId);
    };

    return (
        <div className={style.userPage}>
            <section>
                <img className={style.img} src={mainLogo} alt="Main Logo" />
            </section>
            <section className={style.medicalRecords}>
                <h2 className={style.title}>Medical Records</h2>
                <div className={style.recordContainer}>
                    {medicalRecords.map(record => (
                        <div key={record.id} className={style.recordItem} onClick={() => handleClick(record.id)}>
                            <h3>{record.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
