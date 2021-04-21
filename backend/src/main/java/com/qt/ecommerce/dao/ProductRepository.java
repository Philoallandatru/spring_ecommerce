package com.qt.ecommerce.dao;

import com.qt.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") // accept request from this origin
public interface ProductRepository extends JpaRepository<Product, Long> {


}
