import style from './User.module.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/main.webp';

export function User() {
    const medicalRecords = [
        { id: 1, name: 'Blood Pressure', path: '/blood-pressure' },
        { id: 2, name: 'Blood Test', path: '/blood-test' },
        { id: 3, name: 'Visits', path: '/visits' },
    ];

    const navigate = useNavigate();
    const handleClick = (path) => {
       navigate(path);
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
                        <div key={record.id} className={style.recordItem} onClick={() => handleClick(record.path)}>
                            <h3>{record.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
