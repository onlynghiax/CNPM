package com.ecommerce.usermanagement.dto;

import java.math.BigDecimal;
import java.util.List;

public class AdminStatsDto {
    private BigDecimal totalRevenue;
    private long totalItemsSold;
    private List<OrderDto> recentOrders;

    public AdminStatsDto(BigDecimal totalRevenue, long totalItemsSold, List<OrderDto> recentOrders) {
        this.totalRevenue = totalRevenue;
        this.totalItemsSold = totalItemsSold;
        this.recentOrders = recentOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getTotalItemsSold() {
        return totalItemsSold;
    }

    public void setTotalItemsSold(long totalItemsSold) {
        this.totalItemsSold = totalItemsSold;
    }

    public List<OrderDto> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<OrderDto> recentOrders) {
        this.recentOrders = recentOrders;
    }
}
