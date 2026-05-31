import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  function onFavouriteClick(e) {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
        <div className="movie-overlay">
          <p className="movie-overview">
            {movie.overview ? movie.overview.slice(0, 100) + "..." : "No description available."}
          </p>
        </div>
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavouriteClick}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          ❤
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </span>
          <span className="movie-rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;