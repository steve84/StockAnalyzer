package ch.steve84.stock_analyzer.security.authority;

import org.springframework.security.core.GrantedAuthority;

public class AdminAuthority implements GrantedAuthority {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7994062682213888660L;

	@Override
	public String getAuthority() {
		return "admin";
	}

}
