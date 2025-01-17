package com.movieTime.movies.services;

import com.movieTime.movies.models.Movie;
import com.movieTime.movies.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> findAllMovies(){
        return movieRepository.findAll();
    }

    public Optional<Movie> findMovieByImdb (String imdbId){
        return movieRepository.findMovieByImdbId(imdbId);
    }
}
