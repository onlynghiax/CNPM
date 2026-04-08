package com.ecommerce.usermanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CheckoutResponse {
    private Long orderId;
    private BigDecimal totalPrice;
    private LocalDateTime orderDate;
    private String message;

    public CheckoutResponse(Long orderId, BigDecimal totalPrice, LocalDateTime orderDate, String message) {
        this.orderId = orderId;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
        this.message = message;
    }

    public Long getOrderId() {
        return orderId;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public String getMessage() {
        return message;
    }
}
