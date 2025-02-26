package com.example.demo.repositories;

import com.example.demo.models.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistItemRepo extends JpaRepository<WishlistItem, Long> {

}
