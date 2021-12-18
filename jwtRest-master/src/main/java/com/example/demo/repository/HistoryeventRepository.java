package com.example.demo.repository;

import com.example.demo.model.Historyevent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryeventRepository extends JpaRepository<Historyevent, Long> {
    List<Historyevent> findByUserid(String id);
    List<Historyevent> findByEventid(long eventid);
}