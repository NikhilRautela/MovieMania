const API_KEY = "c13032cf07d22443696a8865741a5a49";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    // aync function is a function that returns a promise.
    //  It allows us to use the await keyword inside the function to wait for asynchronous operations to complete.

    // await is used to wait for a promise to resolve. 
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    // fetch is a browser API that allows us to make HTTP requests. 
    // It returns a promise that resolves to the response of the request.
    const data = await response.json();
    // await response.json() is used to parse the JSON data from the response.
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    // encodeURIComponent is used to encode the search query so that it can be safely included in the URL.
    const data = await response.json();
    // response.json() is used to parse the JSON data from the response.
    return data.results;
};