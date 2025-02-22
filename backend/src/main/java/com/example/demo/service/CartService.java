package com.example.demo.service;

import com.example.demo.models.Cart;
import com.example.demo.repositories.CartRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepo cartRepo;

    public CartService(CartRepo cartRepo) {
        this.cartRepo = cartRepo;
    }

    public List<Cart> getAllCarts() {
        return cartRepo.findAll();
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepo.findById(id);
    }

    public Cart saveCart(Cart cart) {
        return cartRepo.save(cart);
    }

    public void deleteCart(Long id) {
        cartRepo.deleteById(id);
    }
}
