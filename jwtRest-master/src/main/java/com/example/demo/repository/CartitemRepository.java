package com.example.demo.repository;

import com.example.demo.model.Cartitem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartitemRepository extends JpaRepository<Cartitem, Long> {
    List<Cartitem> findByCartid(long cartid);
    Cartitem findByCartidAndProductid(long cartid, long productid);
}