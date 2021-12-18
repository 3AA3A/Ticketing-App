package com.example.demo.repository;

import com.example.demo.model.Favoriteevent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteeventRepository extends JpaRepository<Favoriteevent, Long> {
    List<Favoriteevent> findByUserid(String id);
    List<Favoriteevent> findByEventid(long eventid);
    List<Favoriteevent> findByEventidAndUserid(long eventid, String userid);
}