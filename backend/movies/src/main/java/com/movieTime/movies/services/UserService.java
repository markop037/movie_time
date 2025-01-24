package com.movieTime.movies.services;

import com.movieTime.movies.models.User;
import com.movieTime.movies.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User createUser(User user){
        if(user == null){
            throw new IllegalArgumentException("User cannot be null");
        }

        if(userRepository.findAll().stream()
                .anyMatch(existingUser -> existingUser.getEmail().equals(user.getEmail())
                    || existingUser.getUsername().equals(user.getUsername()))){
            throw new IllegalArgumentException("Email or Username already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User checkUserExists(String username, String password){
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(encoder.matches(password, user.getPassword())){
                return user;
            }
            else{
                throw new IllegalArgumentException("Incorrect password");
            }
        }
        return null;
    }

}
