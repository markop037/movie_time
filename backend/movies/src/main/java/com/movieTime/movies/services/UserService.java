package com.movieTime.movies.services;

import com.movieTime.movies.models.User;
import com.movieTime.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user){
        if(user == null){
            throw new IllegalArgumentException("User cannot be null");
        }

        if(userRepository.findAll().stream()
                .anyMatch(existingUser -> existingUser.getEmail().equals(user.getEmail())
                    || existingUser.getUsername().equals(user.getUsername()))){
            throw new IllegalArgumentException("Email or Username already exists");
        }

        return userRepository.save(user);
    }
}
