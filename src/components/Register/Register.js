import "./Register.css";
import { useContext } from "react";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Register = (props) => {
    const { onRegisterSubmit } = useContext(AuthContext);

    const {formValues, onChangeHandler, onSubmit} = useForm({
        'email': '',
        'password': '',
        'repeat': ''
    }, onRegisterSubmit);

    return (
        <div className="reg-container">
            <h1 className="reg-title">Create account</h1>

            <form className="reg-form" method="post" onSubmit={onSubmit}>
                <label htmlFor="email">Email address</label>
                <input className="reg-email" onChange={onChangeHandler} name="reg-email" type="email" value={formValues.email}/>

                <label htmlFor="reg-password">Password</label>
                <input className="reg-password" name="password" type="password" onChange={onChangeHandler} value={formValues.password}/> 

                <label  htmlFor="repeat">Confirm password</label>
                <input className="reg-repeat" name="repeat" type="password" onChange={onChangeHandler} value={formValues.repeat}/>       

                <button type="submit" className="btn reg-submit">Register</button>
                
                <p className="already-reg">Already registered? Click <Link to={'/register'}>here</Link> to log into your account.</p>
            </form>
        </div>
    )
};