package com.ecommerce.usermanagement.repository;

import com.ecommerce.usermanagement.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByAlbumIdOrderByCreatedAtDesc(Long albumId);
}
