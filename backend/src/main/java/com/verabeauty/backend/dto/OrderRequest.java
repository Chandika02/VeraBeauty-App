package com.verabeauty.backend.dto;

import java.util.List;

public class OrderRequest {

    private String userEmail;
    private Double totalAmount;
    private String shippingAddress;
    private List<Long> productIds;

    public OrderRequest() {}

    public OrderRequest(String userEmail, Double totalAmount, String shippingAddress, List<Long> productIds) {
        this.userEmail = userEmail;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
        this.productIds = productIds;
    }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public List<Long> getProductIds() { return productIds; }
    public void setProductIds(List<Long> productIds) { this.productIds = productIds; }
}