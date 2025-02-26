package com.example.demo.service;

import com.example.demo.models.CartItem;
import com.example.demo.repositories.CartItemRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
    private final CartItemRepo cartItemRepo;

    public CartItemService(CartItemRepo cartItemRepo) {
        this.cartItemRepo = cartItemRepo;
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepo.findAll();
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepo.findById(id);
    }

    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepo.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepo.deleteById(id);
    }
}
