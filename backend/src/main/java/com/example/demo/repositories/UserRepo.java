package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    // Custom queries (optional)
    User findByUsername(String username);
}
