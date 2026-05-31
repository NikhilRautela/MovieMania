import '../css/Favorites.css'
import MovieCard from '../components/MovieCard'
import { useMovieContext } from '../contexts/MovieContext'
import { Link } from 'react-router-dom'

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <div className="favorites-hero">
          <h2>❤ Your Favorites</h2>
          <p>{favorites.length} movie{favorites.length > 1 ? "s" : ""} saved</p>
        </div>
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <div className="empty-icon">🎬</div>
      <h2>No Favorites Yet</h2>
      <p>Looks like you haven't added any movies to your favorites.</p>
      <p>Go back and click the ❤ on any movie to save it here!</p>
      <Link to="/" className="browse-btn">Browse Movies</Link>
    </div>
  );
}

export default Favorites;