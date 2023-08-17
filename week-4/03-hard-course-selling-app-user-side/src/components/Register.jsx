import React from "react";
import { register as registerUser} from "../axios";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const register = async () => {
        const registerRes = await registerUser({username: email, password})
    }

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <input type={"text"} value={email} onChange={e => setEmail(e.target.value)} />
        <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={register}> Register </button>
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;