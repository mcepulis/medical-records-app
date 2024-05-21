import style from './Main.module.css';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/images/main.webp';

export function Main() {
    return (
        <div className={style.container}>
            <section>
                <img className={style.img} src={mainLogo} alt="" />
            </section>
            <section>
                <div className={style.loginContainer}>
                    <h2 className={style.loginTitle}>Login</h2>
                    <form>
                        <div className={style.formGroup}>
                            <label htmlFor="username" className={style.formLabel}>Email</label>
                            <input type="text" id="username" name="username" className={style.formInput} required />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="password" className={style.formLabel}>Password</label>
                            <input type="password" id="password" name="password" className={style.formInput} required />
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