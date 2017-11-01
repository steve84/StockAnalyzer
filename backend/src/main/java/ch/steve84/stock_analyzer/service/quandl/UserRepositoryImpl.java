package ch.steve84.stock_analyzer.service.quandl;

import java.net.URI;
import java.util.Calendar;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestOperations;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import ch.steve84.stock_analyzer.entity.quandl.User;
import ch.steve84.stock_analyzer.enums.Roles;
import ch.steve84.stock_analyzer.repository.quandl.UserRegistrationRepository;
import ch.steve84.stock_analyzer.repository.quandl.UserRepository;

public class UserRepositoryImpl implements UserRegistrationRepository {
    
    @PersistenceContext
    private EntityManager em;
    
    @Value("${google.captcha.secret}")
    private String captchaSecret;

    private RestOperations restOperations;
    @Autowired private UserRepository userRepository;

    @Override
    public User register(User user) {
        user.setRole(Roles.GPU.getRole());
        user.setCreatedAt(Calendar.getInstance());
        user.setToken("123456");
        user.setIsActivated(false);
        return this.userRepository.save(user);
    }

    @Override
    public boolean validateCaptcha(String token) {
        URI verifyUri = URI.create(String.format("https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s", captchaSecret, token));
        GoogleResponse resp = restOperations.getForObject(verifyUri, GoogleResponse.class);
        return resp.isSuccess();
    }

    @Override
    public User findByUsername(String username) {
        Query q = em.createNamedQuery("User.findByUsername");
        q.setParameter("username", username);
        try {
            return (User)q.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public User confirm(Integer userId, String hash) {
        User user = this.userRepository.findOne(userId);
        if (user != null && user.getToken() != null && user.getToken().equals(hash)) {
            user.setIsActivated(true);
            user.setActivatedAt(Calendar.getInstance());
            user.setToken(null);
            return this.userRepository.save(user);
        }
        return null;
    }

}

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
class GoogleResponse {
        @JsonProperty("success")
        private boolean success;

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }
}
