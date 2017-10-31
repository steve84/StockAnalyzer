package ch.steve84.stock_analyzer.repository.quandl;

import java.net.URI;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestOperations;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import ch.steve84.stock_analyzer.entity.quandl.User;
import ch.steve84.stock_analyzer.enums.Roles;

public class UserRepositoryImpl implements UserRegistrationRepository {
    
    @Value("${google.captcha.secret}")
    private String captchaSecret;

    private RestOperations restOperations;
    @Autowired private UserRepository userRepository;
    private Environment env;

    @Override
    public User register(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(Roles.GPU.getRole());
        user.setCreatedAt(Calendar.getInstance());
        return this.userRepository.save(user);
    }

    @Override
    public boolean validateCaptcha(String token) {
        URI verifyUri = URI.create(String.format("https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s", captchaSecret, token));
        GoogleResponse resp = restOperations.getForObject(verifyUri, GoogleResponse.class);
        return resp.isSuccess();
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
