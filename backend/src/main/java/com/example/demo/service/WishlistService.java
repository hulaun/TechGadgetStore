package com.example.demo.service;

import com.example.demo.models.WishlistItem;
import com.example.demo.repositories.WishlistItemRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    private final WishlistItemRepo wishlistItemRepo;

    public WishlistService(WishlistItemRepo wishlistItemRepo) {
        this.wishlistItemRepo = wishlistItemRepo;
    }

    public List<WishlistItem> getAllWishlistItems() {
        return wishlistItemRepo.findAll();
    }

    public Optional<WishlistItem> getWishlistItemById(Long id) {
        return wishlistItemRepo.findById(id);
    }

    public WishlistItem saveWishlistItem(WishlistItem orderItem) {
        return wishlistItemRepo.save(orderItem);
    }

    public void deleteWishlistItem(Long id) {
        wishlistItemRepo.deleteById(id);
    }
}
