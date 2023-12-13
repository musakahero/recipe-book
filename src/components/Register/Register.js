import styles from "./Register.module.css";
import { useContext } from "react";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);

    const {formValues, onChangeHandler, onSubmit} = useForm({
        'email': '',
        'password': '',
        'repeat': ''
    }, onRegisterSubmit);

    return (
        <div className={styles["reg-container"]}>
            <h1 className={styles["reg-title"]} >Create account</h1>

            <form className={styles["reg-form"]}  method="post" onSubmit={onSubmit}>
                <label htmlFor="email">Email address</label>
                <input className={styles["reg-email"]}  onChange={onChangeHandler} name="email" type="email" value={formValues.email}/>

                <label htmlFor="password">Password</label>
                <input className={styles["reg-password"]}  name="password" type="password" onChange={onChangeHandler} value={formValues.password}/> 

                <label  htmlFor="repeat">Confirm password</label>
                <input className={styles["reg-repeat"]}  name="repeat" type="password" onChange={onChangeHandler} value={formValues.repeat}/>       

                <button type="submit" className={styles["btn reg-submit"]} >Register</button>
                
                <p className={styles["already-reg"]} >Already registered? Click <Link to={'/login'}>here</Link> to log into your account.</p>
            </form>
        </div>
    )
};