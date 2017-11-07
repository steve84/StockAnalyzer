package ch.steve84.stock_analyzer.service.quandl;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import ch.steve84.stock_analyzer.entity.quandl.User;
import freemarker.template.Configuration;

@Component
public class MailService {
    
    @Autowired private JavaMailSender mailSender;
    @Autowired private Configuration fmConfig;
    
    public void sendConfirmationMail(final User user) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setSubject("Account registration");
            mimeMessageHelper.setFrom("test@test.com");
            mimeMessageHelper.setTo(user.getUsername());
            
            Map<String, Object> model = new HashMap<String, Object>();
            model.put("user", user);
            
            mimeMessageHelper.setText(geContentFromTemplate(model), true);
            mailSender.send(mimeMessageHelper.getMimeMessage());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
 
    public String geContentFromTemplate(Map<String, Object> model) {
        StringBuffer content = new StringBuffer();
 
        try {
            content.append(FreeMarkerTemplateUtils
                .processTemplateIntoString(fmConfig.getTemplate("email-template.txt"), model));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }
}
