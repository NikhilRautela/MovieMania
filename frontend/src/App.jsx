import React from 'react'
import MovieCard from './components/MovieCard'


const App = () => {
  return (
    <div>
      <MovieCard movie={{ title: "Inception", release_date: "2010-07-16", url: "https://example.com/inception.jpg" }} />
    </div>
    
  )
}

export default App
