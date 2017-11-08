package ch.steve84.stock_analyzer.repository.quandl;

import ch.steve84.stock_analyzer.entity.quandl.User;

public interface UserRegistrationRepository {
    
    User findByUsername(String username);
    User register(User user);
    User confirm(Integer userId, String hash, String password);
    boolean validateCaptcha(String token);

}
