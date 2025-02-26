package com.example.demo.controllers;

import com.example.demo.service.FakeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fake")
public class FakeDataController {

    @Autowired
    private FakeDataService fakeDataService;

    @PostMapping("/generate-brands")
    public ResponseEntity<String> generateBrands(@RequestParam(defaultValue = "10") int count) {
        fakeDataService.generateBrands(count);
        return ResponseEntity.ok(count + " brands generated successfully!");
    }

    @PostMapping("/generate-categories")
    public ResponseEntity<String> generateCategories(@RequestParam(defaultValue = "10") int count) {
        fakeDataService.generateCategories(count);
        return ResponseEntity.ok(count + " categories generated successfully!");
    }

    @PostMapping("/generate-products")
    public ResponseEntity<String> generateProducts(@RequestParam(defaultValue = "10") int count) {
        try {
            fakeDataService.generateProducts(count);
            return ResponseEntity.ok(count + " products generated successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
