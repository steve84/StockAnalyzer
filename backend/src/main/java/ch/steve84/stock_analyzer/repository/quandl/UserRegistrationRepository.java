package ch.steve84.stock_analyzer.repository.quandl;

import ch.steve84.stock_analyzer.entity.quandl.User;

public interface UserRegistrationRepository {
    
    User findByUsername(String username);
    User register(User user);
    User confirm(Integer userId, String hash, String password);
	boolean resetPassword(String username);
	boolean changePassword(Integer userId, String oldPassword, String newPassword);
    boolean validateCaptcha(String token);
    User updateUser(User user);
    User getUser(Integer userId);

}
