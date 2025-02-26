package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class VerificationCodeService {
    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();

    public void saveCode(String email, String code) {
        verificationCodes.put(email, code);
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.schedule(() -> verificationCodes.remove(email), 5, TimeUnit.MINUTES);
    }

    public boolean validateCode(String emailOrPhone, String inputCode) {
        return verificationCodes.remove(emailOrPhone, inputCode);
    }
}