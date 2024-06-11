import style from './User.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import mainLogo from '../../assets/images/main.webp';

export function User() {
    const navigate = useNavigate();
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            navigate('/');
        }
    }, []);

    const medicalRecords = [
        { id: 1, name: 'Blood Pressure', path: '/blood-pressure' },
        { id: 2, name: 'Blood Test', path: '/blood-test' },
        { id: 3, name: 'Visits', path: '/visits' },
    ];

    const handleClick = (path) => {
       navigate(path);
    };

//     const [data, setData] = useState([]);

//     useEffect(() => {
//        const fetchData = async () => {
//            try {
//                const res = await fetch('http://localhost:3555/users');
//                const data = await res.json();
//                setData(data);
//            } catch (err) {
//                setError(err.message);
//            }
//        };
//        fetchData();
//    }, []);


    return (
        <div className={style.userPage}>
            {/* <h1>Sveiki `${data.name}`</h1> */}
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
