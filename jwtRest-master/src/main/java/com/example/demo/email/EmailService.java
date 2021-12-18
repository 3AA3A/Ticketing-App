package com.example.demo.email;

import java.io.IOException;

public interface EmailService {
    void send(String to,String subject, String text) throws IOException;
}