package com.example.demo.repository;

import com.example.demo.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findByUserid(String id);
    List<Coupon> findByCoupcode(String code);
    List<Coupon> findByCoupcodeAndDatevalidIsAfter(String code, Timestamp date);
}