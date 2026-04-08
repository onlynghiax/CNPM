package com.ecommerce.usermanagement.dto;

import com.ecommerce.usermanagement.model.CartItem;

import java.math.BigDecimal;

public class CartItemResponse {
    private Long id;
    private Long albumId;
    private String title;
    private String artist;
    private String imageUrl;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal lineTotal;

    public static CartItemResponse fromCartItem(CartItem item) {
        CartItemResponse response = new CartItemResponse();
        response.id = item.getId();
        response.albumId = item.getAlbum().getId();
        response.title = item.getAlbum().getTitle();
        response.artist = item.getAlbum().getArtist();
        response.imageUrl = item.getAlbum().getImageUrl();
        response.price = item.getAlbum().getPrice();
        response.quantity = item.getQuantity();
        response.lineTotal = item.getAlbum().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        return response;
    }

    public Long getId() {
        return id;
    }

    public Long getAlbumId() {
        return albumId;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }
}
