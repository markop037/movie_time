package com.movieTime.movies.controllers;

import com.movieTime.movies.models.User;
import com.movieTime.movies.models.UserLoginRequest;
import com.movieTime.movies.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        return new ResponseEntity<User>(userService.createUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/check-user")
    public ResponseEntity<?> checkUser(@RequestBody UserLoginRequest userLoginRequest){
        User user = userService.checkUserExists(userLoginRequest.getUsername(),
                userLoginRequest.getPassword());
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist.");
        }
        else{
            return ResponseEntity.ok(user);
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username){
        boolean isDeleted = userService.deleteUserByUsername(username);
        if(isDeleted){
            return ResponseEntity.ok("User deleted successfully.");
        }
        else{
            return ResponseEntity.status(404).body("User not found.");
        }
    }
}
