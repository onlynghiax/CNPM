package com.ecommerce.usermanagement.service;

import com.ecommerce.usermanagement.dto.CheckoutResponse;
import com.ecommerce.usermanagement.model.CartItem;
import com.ecommerce.usermanagement.model.Order;
import com.ecommerce.usermanagement.model.User;
import com.ecommerce.usermanagement.repository.CartItemRepository;
import com.ecommerce.usermanagement.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;

    public OrderService(CartItemRepository cartItemRepository, OrderRepository orderRepository, UserService userService) {
        this.cartItemRepository = cartItemRepository;
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    @Transactional
    public CheckoutResponse checkout(String email, String paymentMethod) {
        User user = userService.getUserByEmail(email);
        List<CartItem> items = cartItemRepository.findByUserIdOrderByIdAsc(user.getId());
        if (items.isEmpty()) {
            throw new IllegalStateException("Your cart is empty.");
        }

        BigDecimal total = items.stream()
                .map(i -> i.getAlbum().getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(total);
        order.setOrderDate(LocalDateTime.now());
        order.setPaymentMethod(paymentMethod);
        if ("Cash on Delivery".equalsIgnoreCase(paymentMethod)) {
            order.setStatus(com.ecommerce.usermanagement.model.OrderStatus.PENDING);
        } else {
            order.setStatus(com.ecommerce.usermanagement.model.OrderStatus.PROCESSING);
        }
        Order saved = orderRepository.save(order);

        cartItemRepository.deleteAll(items);
        return new CheckoutResponse(saved.getId(), saved.getTotalPrice(), saved.getOrderDate(), "Checkout successful.");
    }

    public List<com.ecommerce.usermanagement.dto.OrderDto> getUserOrders(String email) {
        User user = userService.getUserByEmail(email);
        return orderRepository.findByUserIdOrderByOrderDateDesc(user.getId())
                .stream()
                .map(o -> new com.ecommerce.usermanagement.dto.OrderDto(
                        o.getId(), o.getTotalPrice(), o.getOrderDate(), o.getPaymentMethod(), o.getStatus().name()
                ))
                .toList();
    }
}
