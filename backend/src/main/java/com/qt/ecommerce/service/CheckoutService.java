package com.qt.ecommerce.service;


import com.qt.ecommerce.dto.Purchase;
import com.qt.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
