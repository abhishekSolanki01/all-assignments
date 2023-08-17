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




function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/> }/>
        <Route path="/courses" element={<ShowCourses/>} />
        <Route path="/courses/purchased" element={<ShowPurchasedCourses/>} />
        <Route path="/courses/:id" element={<ShowSelectedCourse/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
      </Routes>
    </Router>
  )
}

export default App
