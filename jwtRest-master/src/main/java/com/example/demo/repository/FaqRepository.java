package com.example.demo.repository;

import com.example.demo.model.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findByUserid(String id);
    List<Faq> findByQuestionContains(String question);
    List<Faq> findByUseridAndQuestionContains(String id, String question);
}