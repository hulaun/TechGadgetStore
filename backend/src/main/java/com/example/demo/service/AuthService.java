package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AuthService {

    UserRepo userRepository;
    JWTService jwtService;
    PasswordEncoder passwordEncoder;
    MailService mailService;
    VerificationCodeService verificationCodeService;

    public AuthService(UserRepo userRepository, JWTService jwtService, PasswordEncoder passwordEncoder, MailService mailService, VerificationCodeService verificationCodeService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.verificationCodeService = verificationCodeService;
    }


    public String authenticate(UserDto userDto) {
        final String identifier = userDto.getUsername();
        if(identifier == null){
            throw new IllegalArgumentException("Email or phone number is required");
        }

        User user = userRepository.findByEmail(identifier)
                .orElseGet(()->userRepository.findByPhoneNumber(identifier).orElse(null));

        if(user == null){
            throw new IllegalArgumentException("User not found");
        }

        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail());  // If using JWT
    }

    public String register(UserDto userDto) {

        // Validate email or phone number
        if ((userDto.getEmail() == null || userDto.getEmail().isEmpty()) &&
                (userDto.getPhoneNumber() == null || userDto.getPhoneNumber().isEmpty())) {
            throw new IllegalArgumentException("Either email or phone number is required");
        }

        // Check if the user already exists by email or phone number
        if ((userDto.getEmail() != null && userRepository.findByEmail(userDto.getEmail()).isPresent()) ||
                (userDto.getPhoneNumber() != null && userRepository.findByPhoneNumber(userDto.getPhoneNumber()).isPresent())) {
            throw new IllegalArgumentException("User already exists");
        }

        // Convert DTO to User entity
        User user = userDto.toUser();
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Save user to database
        userRepository.save(user);

        // Generate JWT token based on email or phone number
        return jwtService.generateToken(userDto.getUsername());  // `getUsername()` returns email or phoneNumber
    }

    public String resetPassword(String token) {

        String identifier = jwtService.extractIdentifier(token); // Extract email/phone

        User user = userRepository.findByEmail(identifier)
                .orElseGet(()->userRepository.findByPhoneNumber(identifier)
                .orElse(null));

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        String verificationCode = String.format("%04d", new Random().nextInt(999999));

        // Send email or SMS based on identifier
        if (identifier.contains("@")) {
            mailService.sendVerificationCode(identifier, verificationCode);
        }

        verificationCodeService.saveCode(identifier, verificationCode);

        return "Password reset successfully";
    }

    public String verifyCode(String code, String token) {

        String identifier = jwtService.extractIdentifier(token); // Extract email/phone

        User user = userRepository.findByEmail(identifier)
                .orElseGet(()->userRepository.findByPhoneNumber(identifier).orElse(null));

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (!verificationCodeService.validateCode(identifier,code)) {
            throw new IllegalArgumentException("Invalid verification code");
        }

        return "Verification successful";
    }

    public String changePassword(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getUsername())
                .orElseGet(()->userRepository.findByPhoneNumber(userDto.getUsername()).orElse(null));

        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

//        user.setPassword(passwordEncoder.encode(userDto.getNewPassword()));
        userRepository.save(user);

        return "Password changed successfully";
    }

}