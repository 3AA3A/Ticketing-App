package com.example.demo.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;

@Controller
public class EmailController {

    @Autowired
    public EmailService emailService;

    @RequestMapping(value = "/email", method = RequestMethod.POST)
    public ResponseEntity<?> createMail(@RequestBody EmailObject emailObject) throws IOException {
        emailService.send(emailObject.getTo(), emailObject.getSubject(), emailObject.getText());
        return ResponseEntity.ok("Done");
    }
}