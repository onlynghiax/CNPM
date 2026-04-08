package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.dto.AddToCartRequest;
import com.ecommerce.usermanagement.dto.CartResponse;
import com.ecommerce.usermanagement.dto.UpdateCartItemRequest;
import com.ecommerce.usermanagement.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(Authentication authentication, @RequestBody AddToCartRequest request) {
        try {
            String email = (String) authentication.getPrincipal();
            CartResponse response = cartService.addToCart(email, request.getAlbumId(), request.getQuantity());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping
    public CartResponse getCart(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        return cartService.getCart(email);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(Authentication authentication, @RequestBody UpdateCartItemRequest request) {
        try {
            String email = (String) authentication.getPrincipal();
            CartResponse response = cartService.updateQuantity(email, request.getCartItemId(), request.getQuantity());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(Authentication authentication, @PathVariable Long id) {
        try {
            String email = (String) authentication.getPrincipal();
            CartResponse response = cartService.removeItem(email, id);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
