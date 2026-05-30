import React from 'react'
import './css/App.css'
import Favorites from './pages/Favorites'
import { Routes, Route } from 'react-router-dom'  
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import NavBar from './components/NavBar'


const App = () => {
  return (
    <div>
      <NavBar />
    <main className = "main-content">
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
    </div>
  )
}

export default App
