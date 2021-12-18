package com.example.demo.repository;

import com.example.demo.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserid(String id);
    List<Cart> findByCouponid(String id);
    List<Cart> findByUseridAndStatusContains(String id, String status);
    Cart findByUseridAndStatus(String id, String status);
}