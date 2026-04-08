package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.dto.CheckoutRequest;
import com.ecommerce.usermanagement.dto.CheckoutResponse;
import com.ecommerce.usermanagement.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(Authentication authentication, @RequestBody CheckoutRequest request) {
        try {
            String email = (String) authentication.getPrincipal();
            CheckoutResponse response = orderService.checkout(email, request.getPaymentMethod());
            return ResponseEntity.ok(response);
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
