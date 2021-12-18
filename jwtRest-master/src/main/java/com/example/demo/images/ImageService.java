package com.example.demo.images;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    public void save(MultipartFile file);
}