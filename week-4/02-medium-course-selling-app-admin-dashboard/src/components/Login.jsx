import React from "react";
import { loginAdmin } from "../axios";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        const loginRes = await loginAdmin({ username: email, password })
    }

    return (
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Box>
        // <Paper elevation={1}>
        //     <div>
        //         <h1>Login to admin dashboard</h1>
        //         <br />
        //         Email - <input type={"text"} onChange={e => setEmail(e.target.value)} />
        //         <br />
        //         <br />
        //         Password - <input type={"password"} onChange={e => setPassword(e.target.value)} />
        //         <br />
        //         <button onClick={login}>Login</button>
        //         <br />
        //         New here? <a href="/register">Register</a>
        //     </div>
        // </Paper>
    )

}

export default Login;