package ch.steve84.stock_analyzer.security.authority;

import org.springframework.security.core.GrantedAuthority;

import ch.steve84.stock_analyzer.entity.quandl.Role;

public class UserGroupAuthority implements GrantedAuthority {

    /**
     * 
     */
    private static final long serialVersionUID = -7994062682213888660L;
    
    private Role role;
    
    public UserGroupAuthority() {}
    
    public UserGroupAuthority(Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return this.role.getRoleName();
    }

}
