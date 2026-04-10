package com.ecommerce.usermanagement.controller;

import com.ecommerce.usermanagement.dto.AdminStatsDto;
import com.ecommerce.usermanagement.dto.OrderDto;
import com.ecommerce.usermanagement.model.Order;
import com.ecommerce.usermanagement.model.OrderStatus;
import com.ecommerce.usermanagement.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final OrderRepository orderRepository;

    public AdminController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getStats() {
        List<Order> allOrders = orderRepository.findAll();
        
        // Sum total revenue from orders that are SHIPPED or DELIVERED (assuming completed means these)
        // Adjust logic based on business requirements. Let's include everything for simplicity if status is not SHIPPED/DELIVERED yet.
        // But prompt says "Total Revenue (sum of all completed/delivered orders)"
        BigDecimal totalRevenue = allOrders.stream()
                .filter(o -> o.getStatus() == OrderStatus.DELIVERED || o.getStatus() == OrderStatus.SHIPPED)
                .map(Order::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalItemsSold = allOrders.stream()
                .filter(o -> o.getStatus() == OrderStatus.DELIVERED || o.getStatus() == OrderStatus.SHIPPED)
                .mapToLong(o -> o.getTotalItems() != null ? o.getTotalItems() : 0)
                .sum();

        List<OrderDto> recentOrders = orderRepository.findAll().stream()
                .sorted((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate()))
                .limit(5)
                .map(o -> new OrderDto(o.getId(), o.getTotalPrice(), o.getOrderDate(), o.getPaymentMethod(), o.getStatus().name()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(new AdminStatsDto(totalRevenue, totalItemsSold, recentOrders));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderRepository.findAll().stream()
                .sorted((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate()))
                .map(o -> new OrderDto(o.getId(), o.getTotalPrice(), o.getOrderDate(), o.getPaymentMethod(), o.getStatus().name()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        // status might be passed as a plain string or JSON
        String statusStr = status.replace("\"", "").trim();
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus(OrderStatus.valueOf(statusStr.toUpperCase()));
            orderRepository.save(order);
            return ResponseEntity.ok("Order status updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status: " + statusStr);
        }
    }
}
