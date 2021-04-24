package com.qt.ecommerce.dto;


import com.qt.ecommerce.entity.Address;
import com.qt.ecommerce.entity.Customer;
import com.qt.ecommerce.entity.Order;
import com.qt.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
