import "./Login.css";
export const Login = (props) => {

    return (
        <div className="login-container">
            <h1 className="login-title">Log in</h1>

            <form className="login-form" method="post" onSubmit={null}>
                <label  htmlFor="login-email">Email address</label>
                <input className="login-email" onChange={null} name="login-email" type="email" />

                <label  htmlFor="login-password">Password</label>
                <input className="login-password" name="login-password" type="password"/>        

                <button type="submit" className="btn login-submit">Sign in</button>
                
                <p className="not-registered">Not registered yet? Click <a href={'/register'}>here</a> to create an account.</p>
            </form>
        </div>
    )
};