package ch.steve84.stock_analyzer.security;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import ch.steve84.stock_analyzer.security.authority.AdminAuthority;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static java.util.Collections.emptyList;

import java.util.ArrayList;

public class TokenAuthenticationService {
    static final long EXPIRATIONTIME = 864_000_000; // 10 days
    static final String SECRET = "ThisIsASecret";
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";
    static final String ROLES = "roles";

    static void addAuthentication(HttpServletResponse res, String username, String roles) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .claim(ROLES, roles)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
    }

    static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody();
            String user = claims.getSubject();

            List<GrantedAuthority> authorities = getAuthoritiesOfUser((String)claims.get(ROLES));

            if (user != null) {
                if (authorities.size() > 0)
                    return new UsernamePasswordAuthenticationToken(user, null, authorities);
                else
                    return new UsernamePasswordAuthenticationToken(user, null, emptyList());
            }
        }
        return null;
    }
      
    static List<GrantedAuthority> getAuthoritiesOfUser(String roles) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        String[] rolesArray = roles.split(",");
        for (String role : rolesArray) {
            switch (role.toLowerCase()) {
                case "admin":
                    authorities.add(new AdminAuthority());
                    break;
            }
        }
        return authorities;
    }
}
