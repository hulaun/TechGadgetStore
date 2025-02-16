package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepository;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User createUser(User user) {
        return userRepository.save(user);
    }


    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    public User updateUser(User user) {
        return userRepository.save(user);
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
