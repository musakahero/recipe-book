import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { Button } from "../Button/Button";

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);

    const {formValues, onChangeHandler, onSubmit} = useForm({
        'email': '',
        'password': '',
    }, onLoginSubmit);

    return (
        <div className={styles["login-container"]}>
            <h1 className={styles["login-title"]}>Log in</h1>

            <form className={styles["login-form"]} method="post" onSubmit={onSubmit}>
                <label htmlFor="email">Email address</label>
                <input className={styles["login-email"]} name="email" type="email" onChange={onChangeHandler} value={formValues.email} required/>
                
                <label htmlFor="password">Password</label>
                <input className={styles["login-password"]} name="password" type="password" onChange={onChangeHandler} value={formValues.password} required/>

                <Button type="submit" content="Sign in"/>

                <p className={styles["not-registered"]}>Not registered yet? Click <Link className={styles["here-btn"]} to={'/register'}>here</Link> to create an account.</p>
            </form>
        </div>
    )
};