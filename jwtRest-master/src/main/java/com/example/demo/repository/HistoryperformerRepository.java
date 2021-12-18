package com.example.demo.repository;

import com.example.demo.model.Historyperformer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryperformerRepository extends JpaRepository<Historyperformer, Long> {
    List<Historyperformer> findByUserid(String id);
    List<Historyperformer> findByPerformerid(long performerid);
}