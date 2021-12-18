package com.example.demo.repository;

import com.example.demo.model.Generalfeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GeneralfeedbackRepository extends JpaRepository<Generalfeedback, Long> {
    List<Generalfeedback> findByUserid(String id);
    List<Generalfeedback> findByUseridAndTitleContains(String id, String title);
    List<Generalfeedback> findByViewed(String view);
}