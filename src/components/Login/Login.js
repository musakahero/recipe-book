import "./Login.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
    
    const { onLoginSubmit } = useContext(AuthContext);

    const {formValues, onChangeHandler, onSubmit} = useForm({
        'email': '',
        'password': '',
    }, onLoginSubmit);

    return (
        <div className="login-container">
            <h1 className="login-title">Log in</h1>

            <form className="login-form" method="post" onSubmit={onSubmit}>
                <label htmlFor="email">Email address</label>
                <input className="login-email" name="email" type="email" onChange={onChangeHandler} value={formValues['email']}/>

                <label htmlFor="password">Password</label>
                <input className="login-password" name="password" type="password" onChange={onChangeHandler} value={formValues['password']} />

                <button type="submit" className="btn login-submit">Sign in</button>

                <p className="not-registered">Not registered yet? Click <Link to={'/register'}>here</Link> to create an account.</p>
            </form>
        </div>
    )
};