package ch.steve84.stock_analyzer.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import ch.steve84.stock_analyzer.entity.quandl.User;
import ch.steve84.stock_analyzer.repository.quandl.UserRepository;
import ch.steve84.stock_analyzer.security.authority.UserGroupAuthority;
import ch.steve84.stock_analyzer.service.quandl.SecurityService;

@Component
public class AuthenticationManagerDb implements AuthenticationManager {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityService securityService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userName = authentication.getName();
        String password = (String)authentication.getCredentials();
        User user = this.userRepository.findByUsername(userName);
        if (user == null)
        	throw new UsernameNotFoundException("Username " + userName + " not found");

        String encryptPassword = securityService.hashAndSalt(password, user.getSalt());
        if (!user.getPassword().equals(encryptPassword))
            throw new BadCredentialsException("Password of user " + userName + " is not correct");
        if (!user.isActivated())
            throw new DisabledException("User " + userName + " is not activated");

        List<GrantedAuthority> userAuthorities = getAuthoritiesOfUser(user);

        if (userAuthorities.size() > 0)
            return new UsernamePasswordAuthenticationToken(userName, password, userAuthorities);
        else
            return new UsernamePasswordAuthenticationToken(userName, password);
    }

    private List<GrantedAuthority> getAuthoritiesOfUser(User user) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new UserGroupAuthority(user.getRole()));
        return authorities;
    }
}
