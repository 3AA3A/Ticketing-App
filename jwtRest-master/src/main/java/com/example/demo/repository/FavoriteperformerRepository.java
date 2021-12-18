package com.example.demo.repository;

import com.example.demo.model.Favoriteperformer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteperformerRepository extends JpaRepository<Favoriteperformer, Long> {
    List<Favoriteperformer> findByUserid(String id);
    List<Favoriteperformer> findByPerformerid(long performerid);
    List<Favoriteperformer> findByPerformeridAndUseridContains(long performerid, String userid);
}