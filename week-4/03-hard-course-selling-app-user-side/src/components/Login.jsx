import React from "react";
import { login as loginUser } from "../axios";

import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AccountCircle, VpnKey } from '@mui/icons-material';
import { Box, Button, Typography } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        const loginRes = await loginUser({ username: email, password })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 528,
                    height: 428,
                },
            }}
        >

            <Paper elevation={3} sx={{
                display: "flex", borderRadius: '30px', alignItems: 'center',
                justifyContent: 'center'
            }} >

                <AccountCircle sx={{
                    position: 'absolute', top: '15%', left: '50%', width: 100, height: 100, transform: "translateX(-50%)",
                    textAlign: "center",
                }} />

                <Box sx={{ '& > :not(style)': { m: 4 }, m: 5, height: "auto" }}>
                    <Typography variant="h4">Login to the site</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField required sx={{ width: 300 }} id="input-with-sx" label="Email" variant="standard" onChange={e => setEmail(e.target.value)} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <VpnKey sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField required sx={{ width: 300 }} id="input-with-sx" label="Password" variant="standard" type="password" onChange={e => setPassword(e.target.value)}/>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', t: 3 }} t={3}>
                        <Button onClick={login} variant="contained" >Login</Button>

                    </Box>
                    <Typography variant="h9">New here? <a href="/signup">Register</a> </Typography>
                </Box>

            </Paper>
        </Box>

    )



}

export default Login;