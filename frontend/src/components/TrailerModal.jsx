import { useEffect, useState } from "react";
import { getMovieTrailer } from "../services/api";
import "../css/TrailerModal.css";

function TrailerModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const key = await getMovieTrailer(movie.id);
        setTrailerKey(key);
      } catch (err) {
        setError("Failed to load trailer.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [movie.id]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h3>{movie.title}</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="modal-loading">
              <div className="spinner"></div>
              <p>Loading trailer...</p>
            </div>
          )}

          {!loading && error && (
            <div className="modal-error">{error}</div>
          )}

          {!loading && !trailerKey && !error && (
            <div className="modal-error">No trailer available for this movie.</div>
          )}

          {!loading && trailerKey && (
            <iframe
              className="modal-iframe"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} trailer`}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          )}
        </div>

        <div className="modal-footer">
          <img
            src={movie.poster_path
              ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
              : "https://via.placeholder.com/92x138?text=N/A"}
            alt={movie.title}
            className="modal-poster"
          />
          <div className="modal-meta">
            <p className="modal-movie-title">{movie.title}</p>
            <p className="modal-movie-year">
              {movie.release_date?.split("-")[0]} · ⭐ {movie.vote_average?.toFixed(1)}
            </p>
            <p className="modal-movie-overview">
              {movie.overview?.slice(0, 120)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;