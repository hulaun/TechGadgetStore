package com.example.demo.service;
import com.example.demo.models.OrderItem;
import com.example.demo.repositories.OrderItemRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    private final OrderItemRepo orderItemRepo;

    public OrderItemService(OrderItemRepo orderItemRepo) {
        this.orderItemRepo = orderItemRepo;
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepo.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepo.findById(id);
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepo.save(orderItem);
    }

    public void deleteOrderItem(Long id) {
        orderItemRepo.deleteById(id);
    }
}
