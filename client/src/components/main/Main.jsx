import { useState, useContext } from "react";
import style from './Main.module.css';
import { Link, useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/main.webp';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../context/GlobalContext.jsx';
import { v4 as uuidv4 } from 'uuid';

export function Main() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { updateLoginStatus, updateUserId } = useContext(GlobalContext);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    token: uuidv4()
                })
            });
            const data = await response.json();
            console.log(data); 

            if (data.loggedIn) {
                updateLoginStatus(true);
                updateUserId(data.user.id);
                console.log('Context updated with:', { loggedIn: true, userId: data.user.id });
                Cookies.set('loggedIn', 'true');
                Cookies.set('userId', data.user.id);
                Cookies.set('loginToken', data.token);
                navigate('/user');
            } else {
                console.error('Login failed:', data.message); 
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className={style.container}>
            <section>
                <img className={style.img} src={mainLogo} alt="" />
            </section>
            <section>
                <div className={style.loginContainer}>
                    <h2 className={style.loginTitle}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={style.formGroup}>
                            <label htmlFor="username" className={style.formLabel}>Email</label>
                            <input type="text" id="username" value={email} className={style.formInput} onChange={handleEmail} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="password" className={style.formLabel}>Password</label>
                            <input type="password" id="password" value={password} className={style.formInput} onChange={handlePassword} required />
                        </div>
                        <button type="submit" className={style.btnLogin}>Sign In</button>
                    </form>
                    <p className={style.registerLink}>
                        <Link to="/register" className={style.registerLinkText}>Register a new account</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
