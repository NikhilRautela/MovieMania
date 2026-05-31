import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load popular movies on first render
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to Load Movies. Please Try Again Later.");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    // Search as you type with debounce
    useEffect(() => {
        if (!searchQuery.trim()) {
            // If search is cleared, go back to popular movies
            const loadPopularMovies = async () => {
                setLoading(true);
                try {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                    setError(null);
                } catch (error) {
                    setError("Failed to Load Movies. Please Try Again Later.");
                } finally {
                    setLoading(false);
                }
            };
            loadPopularMovies();
            return;
        }

        // Debounce — wait 500ms after user stops typing before searching
        const delay = setTimeout(async () => {
            setLoading(true);
            try {
                const results = await searchMovies(searchQuery);
                setMovies(results);
                setError(null);
            } catch (error) {
                setError("Failed to search movies. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 500);

        // Cleanup — cancels the previous timeout if user keeps typing
        return () => clearTimeout(delay);

    }, [searchQuery]); // runs every time searchQuery changes

    return (
        <div className="home">
            <div className="home-hero">
                <h1>Welcome to <span>Movie Mania</span></h1>
                <p>Discover the most popular movies and save your favorites</p>
                <div className="search-form">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading movies...</p>
                </div>
            ) : (
                <>
                    <h2 className="section-title">
                        {searchQuery ? `Results for "${searchQuery}"` : "🔥 Popular Movies"}
                    </h2>
                    <div className="movies-grid">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;