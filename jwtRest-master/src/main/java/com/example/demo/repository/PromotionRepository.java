package com.example.demo.repository;

import com.example.demo.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByEventid(long eventid);
    Promotion findByEventidAndDatefromBeforeAndDatetoAfter(long eventid, Timestamp datef, Timestamp datet);
}