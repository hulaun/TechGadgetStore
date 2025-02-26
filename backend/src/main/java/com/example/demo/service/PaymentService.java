package com.example.demo.service;
import com.example.demo.models.Payment;
import com.example.demo.repositories.PaymentRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    private final PaymentRepo paymentRepo;

    public PaymentService(PaymentRepo paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepo.findById(id);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepo.deleteById(id);
    }
}
