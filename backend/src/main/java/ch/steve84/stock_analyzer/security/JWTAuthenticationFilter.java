package ch.steve84.stock_analyzer.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import ch.steve84.stock_analyzer.service.quandl.SecurityService;

public class JWTAuthenticationFilter extends GenericFilterBean {
	
	private SecurityService securityService;
	
	public JWTAuthenticationFilter() {}
	
	public JWTAuthenticationFilter(SecurityService securityService) {
		this.securityService = securityService;
	}

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        Authentication authentication = TokenAuthenticationService.getAuthentication(
        		(HttpServletRequest)req,
        		securityService.getSecret(),
        		securityService.getPrefix(),
        		securityService.getHeader());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        chain.doFilter(req, res);
    }

}
