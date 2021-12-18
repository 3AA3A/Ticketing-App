package com.example.demo.repository;

import com.example.demo.model.Performer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerformerRepository extends JpaRepository<Performer, Long> {
    List<Performer> findByNameContains(String name);
    List<Performer> findByImage(String image);
}