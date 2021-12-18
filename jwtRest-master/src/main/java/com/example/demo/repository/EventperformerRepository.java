package com.example.demo.repository;

import com.example.demo.model.Eventperformer;
import org.springframework.data.jpa.repository.JpaRepository;


import java.sql.Timestamp;
import java.util.List;

public interface EventperformerRepository extends JpaRepository<Eventperformer, Long> {
    List<Eventperformer> findByEventid(long eventid);
    List<Eventperformer> findByPerformerid(long performerid);
    List<Eventperformer> findByEventidAndPerformerid(long eventid, long performerid);
    List<Eventperformer> findByEventidAndPerformeridAndPerformdateAndPerformtime(long eventid, long performerid, Timestamp performdate, String time);
}