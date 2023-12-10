import "./Register.css";
export const Register = (props) => {

    return (
        <div className="reg-container">
            <h1 className="reg-title">Create account</h1>

            <form className="reg-form" method="post" onSubmit={null}>
                <label htmlFor="reg-email">Email address</label>
                <input className="reg-email" onChange={null} name="reg-email" type="email" />

                <label htmlFor="reg-password">Password</label>
                <input className="reg-password" name="reg-password" type="password"/> 

                <label  htmlFor="reg-repeat">Confirm password</label>
                <input className="reg-repeat" name="reg-repeat" type="password"/>       

                <button type="submit" className="btn reg-submit">Register</button>
                
                <p className="already-reg">Already registered? Click <a href={'/register'}>here</a> to log into your account.</p>
            </form>
        </div>
    )
};