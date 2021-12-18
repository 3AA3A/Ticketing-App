package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.security.Timestamp;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByGenreid(long genreid);
    List<Event> findByVenueid(long venueid);
    List<Event> findByUserid(String id);
    List<Event> findByGenreidAndVenueid(long genreid, long venueid);
    List<Event> findByNameContaining(String name);
}