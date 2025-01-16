async function getMovies(){
    try{
        const response = await fetch("http://localhost:8080/movies");

        if(!response.ok){
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }

        const moviesData = await response.json();

        const movies = moviesData.map(movie =>
            new Movie(
                movie.imdbId,
                movie.title,
                movie.releaseDate,
                movie.trailerLink,
                movie.poster,
                movie.genres,
                movie.backdrops
            )
        );

        return movies;
    } catch(error){
        console.error("Error fetching movies: ", error);
    }
}