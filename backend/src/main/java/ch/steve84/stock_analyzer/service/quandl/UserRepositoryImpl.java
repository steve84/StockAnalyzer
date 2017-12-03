package ch.steve84.stock_analyzer.service.quandl;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.Calendar;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.commons.text.CharacterPredicates;
import org.apache.commons.text.RandomStringGenerator;
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
	
	private final int SALT_LENGTH = 32;
	private final int TOKEN_LENGTH = 20;
	private final int PASSWORD_LENGTH = 10;
    
    @PersistenceContext
    private EntityManager em;
    
    @Value("${google.captcha.secret}")
    private String captchaSecret;

    private RestOperations restOperations;
    @Autowired private UserRepository userRepository;
    @Autowired private MailService mailService;
    @Autowired private SecurityService securityService;

    @Override
    public User register(User user) {
        user.setRole(Roles.GPU.getRole());
        user.setCreatedAt(Calendar.getInstance());
        user.setToken(securityService.generateRandomString(TOKEN_LENGTH));
        user.setSalt(securityService.generateRandomString(SALT_LENGTH));
        user.setIsActivated(false);
        String password = securityService.hashAndSalt(user.getPassword(), user.getSalt());
		if (password == null)
			return null;
		else
			user.setPassword(password);
		User createdUser = this.userRepository.save(user);
		mailService.sendRegistrationMail(createdUser);
        return createdUser;
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
    public User confirm(Integer userId, String hash, String password) {
        User user = this.userRepository.findOne(userId);
        if (user != null && user.getToken() != null && user.getToken().equals(hash) && user.getPassword().equals(securityService.hashAndSalt(password, user.getSalt()))) {
            user.setIsActivated(true);
            user.setActivatedAt(Calendar.getInstance());
            user.setToken(null);
            mailService.sendWelcomeMail(user);
            return this.userRepository.save(user);
        }
        return null;
    }

	@Override
	public boolean resetPassword(String username) {
		User user = this.userRepository.findByUsername(username);
		if (user != null) {
			String newPassword = securityService.generateRandomString(PASSWORD_LENGTH);
			user.setSalt(securityService.generateRandomString(SALT_LENGTH));
			user.setPassword(securityService.hashAndSalt(newPassword, user.getSalt()));
			User updatedUser = this.userRepository.save(user);
			mailService.sendPasswordResetMail(updatedUser, newPassword);
			return true;
		}
		return false;
	}

	@Override
	public boolean changePassword(Integer userId, String oldPassword, String newPassword) {
		User user = this.userRepository.findOne(userId);
		if (user != null) {
			if (user.getPassword().equals(securityService.hashAndSalt(oldPassword, user.getSalt()))) {
				user.setSalt(securityService.generateRandomString(SALT_LENGTH));
				user.setPassword(securityService.hashAndSalt(newPassword, user.getSalt()));
				User updatedUser = this.userRepository.save(user);
				if (updatedUser != null)
					return true;				
			}
		}
		return false;
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
