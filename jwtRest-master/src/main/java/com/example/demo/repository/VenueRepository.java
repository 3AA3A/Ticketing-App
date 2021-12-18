package com.example.demo.repository;

import com.example.demo.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByNameContainsAndAndCityContainsAndCapacityBetween(String name, String city, Integer from, Integer to);
    List<Venue> findByImage(String image);
}