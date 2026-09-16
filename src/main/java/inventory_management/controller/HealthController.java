package com.example.inventory.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "Sistem durum kontrolü endpoint'i")
public class HealthController {

    @GetMapping
    @Operation(summary = "Sistem sağlık durumunu döndürür")
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> response = Map.of(
                "status", "UP",
                "timestamp", LocalDateTime.now(),
                "message", "Mini Inventory Management API is running smoothly."
        );
        return ResponseEntity.ok(response);
    }
}