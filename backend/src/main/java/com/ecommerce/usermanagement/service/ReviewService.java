package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.dto.ReviewDto;
import com.ecommerce.usermanagement.model.Album;
import com.ecommerce.usermanagement.model.Review;
import com.ecommerce.usermanagement.model.User;
import com.ecommerce.usermanagement.repository.AlbumRepository;
import com.ecommerce.usermanagement.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final AlbumRepository albumRepository;
    private final UserService userService;

    public ReviewService(ReviewRepository reviewRepository, AlbumRepository albumRepository, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.albumRepository = albumRepository;
        this.userService = userService;
    }

    public List<ReviewDto> getReviewsForAlbum(Long albumId) {
        return reviewRepository.findByAlbumIdOrderByCreatedAtDesc(albumId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ReviewDto addReview(String email, Long albumId, Integer rating, String comment) {
        User user = userService.getUserByEmail(email);
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new IllegalStateException("Album not found."));

        if (rating == null || rating < 1 || rating > 5) {
            throw new IllegalStateException("Rating must be between 1 and 5.");
        }

        Review review = new Review();
        review.setUser(user);
        review.setAlbum(album);
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(LocalDateTime.now());
        
        Review saved = reviewRepository.save(review);
        return mapToDto(saved);
    }

    private ReviewDto mapToDto(Review review) {
        return new ReviewDto(
                review.getId(),
                review.getAlbum().getId(),
                review.getUser().getFullName(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt()
        );
    }
}
