package com.example.demo.repository;

import com.example.demo.model.Performerreview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface PerformerreviewRepository extends JpaRepository<Performerreview, Long> {
    List<Performerreview> findByUserid(String id);
    List<Performerreview> findByPerformerid(long performerid);
    List<Performerreview> findByReviewContainsAndRevdateBetweenAndUseridAndPerformerid(String review, Timestamp from, Timestamp to, String userid, Long performerid);
}