import { useState, useEffect } from "react";
import style from './Register.module.css';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/images/main.webp';

export function Register() {
    // const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3555/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    name,
                    email,
                    password,
                    repeatPassword
                })
            });
            const data = await res.json();
            if (data.error) {
                setError(true);
            } else {
                setName("");
                setEmail("");
                setPassword("");
                setRepeatPassword("");
                console.log("successfully registered");
                setError(false);
            }
        } catch (err) {
            setError(err.message);
        }
    }
    
        
    return (
        <div className={style.container}>
            <section>
                <img className={style.img} src={mainLogo} alt="Main Logo" />
            </section>
            <section>
                <div className={style.registerContainer}>
                    <h2 className={style.registerTitle}>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={style.formGroup}>
                            <label htmlFor="name" className={style.formLabel}>Name</label>
                            <input type="text" id="name" name="name" className={style.formInput} onChange={handleName} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="email" className={style.formLabel}>Email</label>
                            <input type="email" id="email" name="email" className={style.formInput} onChange={handleEmail} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="password" className={style.formLabel}>Password</label>
                            <input type="password" id="password" name="password" className={style.formInput} onChange={handlePassword} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="repeatPassword" className={style.formLabel}>Repeat Password</label>
                            <input type="password" id="repeatPassword" name="repeatPassword" className={style.formInput} onChange={handleRepeatPassword} required />
                        </div>
                        <button type="submit" className={style.btnRegister}>Register</button>
                    </form>
                    <p className={style.loginLink}>
                        <Link to="/" className={style.loginLinkText}>Already have an account? Sign in</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}