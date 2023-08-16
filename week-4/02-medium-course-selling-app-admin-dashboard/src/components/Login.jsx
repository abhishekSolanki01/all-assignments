import React from "react";
import { loginAdmin } from "../axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        const loginRes = await loginAdmin({username: email, password})
    }

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        Email - <input type={"text"} onChange={e => setEmail(e.target.value)} />
        <br/>
        <br/>
        Password - <input type={"password"} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick={login}>Login</button>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;