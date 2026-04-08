package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.dto.CartItemResponse;
import com.ecommerce.usermanagement.dto.CartResponse;
import com.ecommerce.usermanagement.model.Album;
import com.ecommerce.usermanagement.model.CartItem;
import com.ecommerce.usermanagement.model.User;
import com.ecommerce.usermanagement.repository.AlbumRepository;
import com.ecommerce.usermanagement.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final AlbumRepository albumRepository;
    private final UserService userService;

    public CartService(CartItemRepository cartItemRepository, AlbumRepository albumRepository, UserService userService) {
        this.cartItemRepository = cartItemRepository;
        this.albumRepository = albumRepository;
        this.userService = userService;
    }

    @Transactional
    public CartResponse addToCart(String email, Long albumId, Integer quantity) {
        int qty = (quantity == null || quantity < 1) ? 1 : quantity;
        User user = userService.getUserByEmail(email);
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new IllegalArgumentException("Album not found."));

        CartItem item = cartItemRepository.findByUserIdAndAlbumId(user.getId(), albumId).orElseGet(() -> {
            CartItem newItem = new CartItem();
            newItem.setUser(user);
            newItem.setAlbum(album);
            newItem.setQuantity(0);
            return newItem;
        });

        item.setQuantity(item.getQuantity() + qty);
        cartItemRepository.save(item);
        return getCart(email);
    }

    @Transactional(readOnly = true)
    public CartResponse getCart(String email) {
        User user = userService.getUserByEmail(email);
        List<CartItemResponse> items = cartItemRepository.findByUserIdOrderByIdAsc(user.getId()).stream()
                .map(CartItemResponse::fromCartItem)
                .toList();
        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new CartResponse(items, subtotal);
    }

    @Transactional
    public CartResponse updateQuantity(String email, Long cartItemId, Integer quantity) {
        if (quantity == null || quantity < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }
        User user = userService.getUserByEmail(email);
        CartItem item = cartItemRepository.findByIdAndUserId(cartItemId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found."));
        item.setQuantity(quantity);
        cartItemRepository.save(item);
        return getCart(email);
    }

    @Transactional
    public CartResponse removeItem(String email, Long cartItemId) {
        User user = userService.getUserByEmail(email);
        CartItem item = cartItemRepository.findByIdAndUserId(cartItemId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found."));
        cartItemRepository.delete(item);
        return getCart(email);
    }
}
