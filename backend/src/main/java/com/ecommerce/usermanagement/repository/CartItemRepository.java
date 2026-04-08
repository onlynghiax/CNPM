package com.ecommerce.usermanagement.repository;

import com.ecommerce.usermanagement.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserIdOrderByIdAsc(Long userId);

    Optional<CartItem> findByUserIdAndAlbumId(Long userId, Long albumId);

    Optional<CartItem> findByIdAndUserId(Long id, Long userId);
}
