package com.example.demo.controllers;

import com.example.demo.dto.UserDto;
import com.example.demo.dto.VerificationCodeDto;
import com.example.demo.service.AuthService;
import com.example.demo.service.JWTService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService, JWTService jwtService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDto user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) {
        String token =  authService.authenticate(userDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(token);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return ResponseEntity.status(HttpStatus.OK).body(authService.resetPassword(token));
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestBody VerificationCodeDto code, @RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return ResponseEntity.status(HttpStatus.OK).body(authService.verifyCode(code.getCode(), token));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody UserDto userDto, @RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return ResponseEntity.status(HttpStatus.OK).body(authService.changePassword(userDto, token));
    }
}
