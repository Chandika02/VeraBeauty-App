package com.verabeauty.backend.controller;

import com.verabeauty.backend.entity.Order;
import com.verabeauty.backend.repository.OrderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(originPatterns = "*")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public static class OrderRequest {
        private String userEmail;
        private Double totalAmount;
        private String shippingAddress;
        private List<Long> productIds;

        public OrderRequest() {}

        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

        public Double getTotalAmount() { return totalAmount; }
        public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

        public String getShippingAddress() { return shippingAddress; }
        public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

        public List<Long> getProductIds() { return productIds; }
        public void setProductIds(List<Long> productIds) { this.productIds = productIds; }
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        try {
            Order order = new Order();
            order.setUserEmail(request.getUserEmail());
            order.setTotalAmount(request.getTotalAmount());
            order.setShippingAddress(request.getShippingAddress());
            order.setProductIds(request.getProductIds());
            order.setOrderStatus("CONFIRMED");
            order.setOrderDate(LocalDateTime.now().toString());

            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            error.put("cause", e.getCause() != null ? e.getCause().getMessage() : "None");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/user/{email}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String email) {
        List<Order> orders = orderRepository.findByUserEmailOrderByOrderDateDesc(email);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}