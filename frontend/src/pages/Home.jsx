import MovieCard from "../components/MovieCard";
import {useState} from "react";

function Home(){
    const [searchQuery, setSearchQuery] = useState("");   

     const movies = [
        {id : 1, title: "Inception", release_date: "2010-07-16", url: "https://example.com/inception.jpg" },
        {id : 2, title: "The Matrix", release_date: "1999-03-31", url: "https://example.com/matrix.jpg" },
        {id : 3, title: "Interstellar", release_date: "2014-11-07", url: "https://example.com/interstellar.jpg" },
     ];
     const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery("");
     }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form> 
       <div className="movies-grid">
            {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
         )
        )}

        </div>
    </div>
    
}
export default Home;