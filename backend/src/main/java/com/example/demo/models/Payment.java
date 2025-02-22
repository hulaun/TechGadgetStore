package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double amount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod; // CARD, PAYPAL, BANK_TRANSFER

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // PENDING, SUCCESSFUL, FAILED
}

enum PaymentMethod {
    CARD, PAYPAL, BANK_TRANSFER
}

enum PaymentStatus {
    PENDING, SUCCESSFUL, FAILED
}
