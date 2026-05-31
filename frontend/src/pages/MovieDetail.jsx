import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieCast, getMovieTrailer } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [movieData, castData, trailer] = await Promise.all([
          getMovieDetails(id),
          getMovieCast(id),
          getMovieTrailer(id),
        ]);
        setMovie(movieData);
        setCast(castData);
        setTrailerKey(trailer);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading) return (
    <div className="detail-loading">
      <div className="spinner"></div>
      <p>Loading movie details...</p>
    </div>
  );

  if (error) return <div className="detail-error">{error}</div>;

  const favorite = isFavorite(movie.id);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-detail">

      {/* Hero Section */}
      <div
        className="detail-hero"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
        }}
      >
        <div className="detail-hero-overlay">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="detail-hero-content">
            <img src={posterUrl} alt={movie.title} className="detail-poster" />
            <div className="detail-info">
              <h1>{movie.title}</h1>
              <div className="detail-meta">
                <span>📅 {movie.release_date?.split("-")[0]}</span>
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>🕐 {movie.runtime} min</span>
              </div>
              <div className="detail-genres">
                {movie.genres?.map(g => (
                  <span key={g.id} className="genre-badge">{g.name}</span>
                ))}
              </div>
              <p className="detail-overview">{movie.overview}</p>
              <button
                className={`fav-btn ${favorite ? "active" : ""}`}
                onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
              >
                {favorite ? "❤ Remove from Favorites" : "🤍 Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailerKey && (
        <div className="detail-section">
          <h2 className="section-title">🎬 Trailer</h2>
          <div className="trailer-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} trailer`}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="detail-section">
          <h2 className="section-title">🎭 Cast</h2>
          <div className="cast-grid">
            {cast.map(member => (
              <div key={member.id} className="cast-card">
                <img
                  src={member.profile_path
                    ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                    : "https://via.placeholder.com/185x278?text=N/A"}
                  alt={member.name}
                />
                <p className="cast-name">{member.name}</p>
                <p className="cast-character">{member.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default MovieDetail;