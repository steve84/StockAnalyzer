package ch.steve84.stock_analyzer.service.quandl;

import java.net.URI;
import java.util.Calendar;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestOperations;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import ch.steve84.stock_analyzer.entity.quandl.StripeCustomerDTO;
import ch.steve84.stock_analyzer.entity.quandl.User;
import ch.steve84.stock_analyzer.enums.Roles;
import ch.steve84.stock_analyzer.repository.quandl.UserRegistrationRepository;
import ch.steve84.stock_analyzer.repository.quandl.UserRepository;

public class UserRepositoryImpl implements UserRegistrationRepository {
	
	private final int SALT_LENGTH = 32;
	private final int TOKEN_LENGTH = 20;
	private final int PASSWORD_LENGTH = 10;
	
	private final String [] IGNORE_FIELDS = {"password", "salt", "token", "stripeCustomer"};
    
    @PersistenceContext
    private EntityManager em;
    
    @Value("${google.captcha.secret}")
    private String captchaSecret;

    private RestOperations restOperations;
    @Autowired private UserRepository userRepository;
    @Autowired private MailService mailService;
    @Autowired private SecurityService securityService;
    @Autowired private StripeService stripeService;

    @Override
    @Transactional(rollbackOn=Exception.class)
    public User register(User user) {
        user.setRole(Roles.GPU.getRole());
        user.setLanguage("DE");
        user.setCreatedAt(Calendar.getInstance());
        user.setToken(securityService.generateRandomString(TOKEN_LENGTH));
        user.setSalt(securityService.generateRandomString(SALT_LENGTH));
        user.setIsActivated(false);
        String password = securityService.hashAndSalt(user.getPassword(), user.getSalt());
		if (password == null)
			return null;

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
    @Transactional(rollbackOn=Exception.class)
    public boolean confirm(Integer userId, String hash, String password) {
        User user = this.userRepository.findOne(userId);
        if (user != null && user.getToken() != null && user.getToken().equals(hash) && user.getPassword().equals(securityService.hashAndSalt(password, user.getSalt()))) {
            user.setIsActivated(true);
            user.setActivatedAt(Calendar.getInstance());
            user.setToken(null);
            mailService.sendWelcomeMail(user);
            user = stripeService.createCustomer(user);
            stripeService.createSubscription(user.getStripeCustomer(), true);
            this.userRepository.save(user);
            return true;
        }
        return false;
    }

	@Override
	@Transactional(rollbackOn=Exception.class)
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
	@Transactional(rollbackOn=Exception.class)
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

	@Override
	@Transactional(rollbackOn=Exception.class)
	public User updateUser(User user) {
		User existingUser = this.userRepository.findOne(user.getUserId());
		existingUser.setLanguage(user.getLanguage());
		User updatedUser = new User();
		BeanUtils.copyProperties(this.userRepository.save(existingUser), updatedUser, IGNORE_FIELDS);
		updatedUser.setStripeCustomerDTO(new StripeCustomerDTO(this.stripeService.getCustomer(existingUser.getStripeCustomer())));
		return updatedUser;
	}

	@Override
	public User getUser(Integer userId) {
		User user = new User();
		User existingUser = this.userRepository.findOne(userId);
		BeanUtils.copyProperties(existingUser, user, IGNORE_FIELDS);
		user.setStripeCustomerDTO(new StripeCustomerDTO(this.stripeService.getCustomer(existingUser.getStripeCustomer())));
		return user;
	}
	
	@Override
    public boolean remove(Integer userId, String password) {
        User user = this.userRepository.findOne(userId);
        if (user.getPassword().equals(securityService.hashAndSalt(password, user.getSalt()))) {
            this.stripeService.removeCustomer(user.getStripeCustomer());
            this.userRepository.delete(userId);
            return true;
        }
        return false;
    }

    @Override
    public boolean addCard(Integer userId, String token) {
        User user = this.userRepository.findOne(userId);
        if (this.stripeService.cancelSubscription(user.getStripeCustomer()) &&
        		this.stripeService.addCardToCustomer(user.getStripeCustomer(), token) &&
        		this.stripeService.createSubscription(user.getStripeCustomer(), false)) {
        	user.setRole(Roles.ABO.getRole());
        	this.userRepository.save(user);
        	return true;
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
