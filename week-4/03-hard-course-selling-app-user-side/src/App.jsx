import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './components/Landing'
import ShowCourses from './components/ShowCourses'
import ShowPurchasedCourses from './components/ShowPurchasedCourses'
import ShowSelectedCourse from './components/ShowSelectedCourse'
import Login from './components/Login'
import Register from './components/Register'

//mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarCustom from './components/helperComponents/AppBarCustom'
import { Container } from '@mui/material'
import Footer from './components/helperComponents/Footer'

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
})


function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{
                
      }}>
        <Router>
        <AppBarCustom />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<ShowCourses />} />
            <Route path="/courses/purchased" element={<ShowPurchasedCourses />} />
            <Route path="/courses/:id" element={<ShowSelectedCourse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </Router>
      </Container>
      <Footer/>
      
    </ThemeProvider>
  )
}

export default App
