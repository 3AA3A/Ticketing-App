package com.example.demo.email;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class EmailServiceImpl implements EmailService {

    @Value("${from-email}")
    String FROM_ADDRESS;

    @Autowired
    SendGrid sendGrid;

    public void send(String to, String subject, String text) throws IOException {

        Email from = new Email(FROM_ADDRESS);
        Email emailTo = new Email(to);
        Content content = new Content("text/html", text);
        Mail mail = new Mail(from, subject, emailTo, content);

        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sendGrid.api(request);
        System.out.println(response.getStatusCode());
        System.out.println(response.getBody());
        System.out.println(response.getHeaders());
    }
}
