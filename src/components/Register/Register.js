import styles from "./Register.module.css";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);

    const { formValues, onChangeHandler, onSubmit } = useForm({
        'username': '',
        'email': '',
        'password': '',
        'repeat': ''
    }, onRegisterSubmit);

    return (
        <div className={styles["reg-container"]}>
            <h1 className={styles["reg-title"]} >Create account</h1>

            <form className={styles["reg-form"]} method="post" onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input className={styles["reg-username"]} name="username" type="text" onChange={onChangeHandler} value={formValues.username} required/>

                <label htmlFor="email">Email address</label>
                <input className={styles["reg-email"]} onChange={onChangeHandler} name="email" type="email" value={formValues.email} required/>

                <label htmlFor="password">Password</label>
                <input className={styles["reg-password"]} name="password" type="password" onChange={onChangeHandler} value={formValues.password} required/>

                <label htmlFor="repeat">Confirm password</label>
                <input className={styles["reg-repeat"]} name="repeat" type="password" onChange={onChangeHandler} value={formValues.repeat} required/>

                <button type="submit" className={`${styles["btn"]} ${styles["reg-submit"]}`} >Register</button>

                <p className={styles["already-reg"]} >Already registered? Click <Link className={styles["here-btn"]} to={'/login'}>here</Link> to log into your account.</p>
            </form>
        </div>
    )
};