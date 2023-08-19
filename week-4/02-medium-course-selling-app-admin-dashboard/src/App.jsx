import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import ShowSelectedCourse from './components/ShowSelectedCourse';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
  });


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<CreateCourse />} />
                    <Route path="/courses" element={<ShowCourses />} />
                    <Route path="/courses/:id" element={<ShowSelectedCourse/>}/>
                </Routes>
            </Router>
        </ThemeProvider>

    );
}

export default App;