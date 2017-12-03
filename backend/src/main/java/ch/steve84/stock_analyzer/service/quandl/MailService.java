package ch.steve84.stock_analyzer.service.quandl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import ch.steve84.stock_analyzer.entity.quandl.User;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;

@Component
public class MailService {
    
    @Autowired private JavaMailSender mailSender;
    @Autowired private Configuration fmConfig;
    
    @Value("${mail.from}")
    private String mailFrom;
    @Value("${mail.info}")
    private String mailInfo;
    @Value("${url.frontend}")
    private String url;
    @Value("${project.name}")
    private String projectName;
    @Value("${company.addressLine1}")
    private String addressLine1;
    @Value("${project.name}")
    private String addressLine2;
    @Value("${project.name}")
    private String addressLine3;
    @Value("${company.twitter.url}")
    private String twitterUrl;
    @Value("${company.twitter.label}")
    private String twitterLabel;
    @Value("${company.facebook.url}")
    private String facebookUrl;
    @Value("${company.facebook.label}")
    private String facebookLabel;
    
    public void sendRegistrationMail(final User user) {
        String template = String.format("registration_%s.txt", user.getLanguage().toLowerCase());
        Map<String, Object> model = createObjectMap(user);
        sendMail("Account registration", mailFrom, user.getEmail(), model, template);
    }

    public void sendWelcomeMail(final User user) {
        String template = String.format("welcome_%s.txt", user.getLanguage().toLowerCase());
        Map<String, Object> model = createObjectMap(user);
        sendMail("Welcome", mailFrom, user.getEmail(), model, template);
    }
    
    public void sendPasswordResetMail(final User user, final String password) {
        String template = String.format("password_reset_%s.txt", user.getLanguage().toLowerCase());
        Map<String, Object> model = createObjectMap(user);
        model.put("password", password);
        sendMail("Passwort reset", mailFrom, user.getEmail(), model, template);
    }
    
    private Map<String, Object> createObjectMap(final User user) {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("user", user);
        model.put("url", url);
        model.put("mailInfo", mailInfo);
        model.put("projectName", projectName);
        model.put("addressLine1", addressLine1);
        model.put("addressLine2", addressLine2);
        model.put("addressLine3", addressLine3);
        model.put("twitterUrl", twitterUrl);
        model.put("twitterLabel", twitterLabel);
        model.put("facebookUrl", facebookUrl);
        model.put("facebookLabel", facebookLabel);
        return model;
    }
    
    public void sendMail(String subject, String from, String to, Map<String, Object> model, String template) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(to);
            
            mimeMessageHelper.setText(geContentFromTemplate(model, template), true);
            mailSender.send(mimeMessageHelper.getMimeMessage());
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
 
    public String geContentFromTemplate(Map<String, Object> model, String template) throws TemplateException, IOException {
        StringBuffer content = new StringBuffer();
        content.append(FreeMarkerTemplateUtils.processTemplateIntoString(fmConfig.getTemplate(template), model));
        return content.toString();
    }
}
