package ch.steve84.stock_analyzer.controller.quandl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.steve84.stock_analyzer.entity.quandl.User;
import ch.steve84.stock_analyzer.repository.quandl.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
   
    @Autowired
    private UserRepository userRepository;

    // http://www.thejavageek.com/2017/06/16/crud-application-using-angular-4-spring-rest-web-services-spring-data-jpa/
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public User register(@RequestBody User user) {
        return this.userRepository.register(user);
    }

    @RequestMapping(value = "/confirm/{userId}/{userHash}", method = RequestMethod.POST)
    public User confirm(@PathVariable("userId") Integer userId, @PathVariable("userHash") String userHash) {
        return this.userRepository.confirm(userId, userHash);
    }
    
    @RequestMapping(value = "/captcha", method = RequestMethod.POST)
    public boolean captcha(@RequestBody String token) {
        return this.userRepository.validateCaptcha(token);
    }

}
