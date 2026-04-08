package com.ecommerce.usermanagement.repository;

import com.ecommerce.usermanagement.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
