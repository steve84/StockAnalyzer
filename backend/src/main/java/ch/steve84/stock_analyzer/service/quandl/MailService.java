package ch.steve84.stock_analyzer.service.quandl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MailService {
    
    @Autowired private JavaMailSender mailSender;

}
