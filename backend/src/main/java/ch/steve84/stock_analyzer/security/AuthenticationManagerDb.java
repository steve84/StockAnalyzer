package ch.steve84.stock_analyzer.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;

import ch.steve84.stock_analyzer.entity.quandl.User;
import ch.steve84.stock_analyzer.repository.quandl.UserRepository;

public class AuthenticationManagerDb implements AuthenticationManager {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String userName = (String)authentication.getPrincipal();
		String password = (String)authentication.getCredentials();
		User user = this.userRepository.findByUsername(userName);
		if (user == null)
			throw new UsernameNotFoundException("Username " + userName + " not found");
		if (!user.getPassword().equals(password))
			throw new BadCredentialsException("Password of user " + userName + " is not correct");
		return new UsernamePasswordAuthenticationToken(userName, password);
	}

}
