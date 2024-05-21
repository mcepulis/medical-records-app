import style from './Register.module.css';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/images/main.webp';

export function Register() {
    return (
        <div className={style.container}>
            <section>
                <img className={style.img} src={mainLogo} alt="Main Logo" />
            </section>
            <section>
                <div className={style.registerContainer}>
                    <h2 className={style.registerTitle}>Register</h2>
                    <form>
                        <div className={style.formGroup}>
                            <label htmlFor="name" className={style.formLabel}>Name</label>
                            <input type="text" id="name" name="name" className={style.formInput} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="email" className={style.formLabel}>Email</label>
                            <input type="email" id="email" name="email" className={style.formInput} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="password" className={style.formLabel}>Password</label>
                            <input type="password" id="password" name="password" className={style.formInput} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="repeatPassword" className={style.formLabel}>Repeat Password</label>
                            <input type="password" id="repeatPassword" name="repeatPassword" className={style.formInput} required />
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