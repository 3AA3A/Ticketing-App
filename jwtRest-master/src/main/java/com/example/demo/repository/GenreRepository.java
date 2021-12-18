package com.example.demo.repository;

import com.example.demo.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GenreRepository extends JpaRepository<Genre, Long> {
    List<Genre> findByNameContainsAndDescContains(String name, String desc);
}