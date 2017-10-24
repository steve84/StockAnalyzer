package ch.steve84.stock_analyzer.repository.quandl;

import ch.steve84.stock_analyzer.entity.quandl.User;

public interface UserRegistrationRepository {
    
    User register(String username, String password);
    boolean validateCaptcha(String token);

}
