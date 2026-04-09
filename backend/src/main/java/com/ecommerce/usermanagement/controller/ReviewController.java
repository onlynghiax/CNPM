package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.dto.ReviewDto;
import com.ecommerce.usermanagement.dto.ReviewRequest;
import com.ecommerce.usermanagement.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/album/{albumId}")
    public ResponseEntity<List<ReviewDto>> getAlbumReviews(@PathVariable Long albumId) {
        return ResponseEntity.ok(reviewService.getReviewsForAlbum(albumId));
    }

    @PostMapping
    public ResponseEntity<?> addReview(Authentication authentication, @RequestBody ReviewRequest request) {
        try {
            String email = (String) authentication.getPrincipal();
            ReviewDto saved = reviewService.addReview(email, request.getAlbumId(), request.getRating(), request.getComment());
            return ResponseEntity.ok(saved);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
