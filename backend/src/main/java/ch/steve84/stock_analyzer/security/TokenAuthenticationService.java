package ch.steve84.stock_analyzer.security;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import ch.steve84.stock_analyzer.enums.Roles;
import ch.steve84.stock_analyzer.security.authority.UserGroupAuthority;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static java.util.Collections.emptyList;

import java.util.ArrayList;

public class TokenAuthenticationService {
    static final String ROLES = "roles";
    static final String ID = "id";

    static void addAuthentication(HttpServletResponse res, String username, String roles, Integer userId, long expirationTime, String secret, String prefix, String header) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .claim(ROLES, roles)
                .claim(ID, userId)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
        res.addHeader(header, prefix + " " + JWT);
    }

    static Authentication getAuthentication(HttpServletRequest request, String secret, String prefix, String header) {
        String token = request.getHeader(header);
        if (token != null) {
            // parse the token.
            Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token.replace(prefix, "")).getBody();
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
                    authorities.add(new UserGroupAuthority(Roles.ADMIN.getRole()));
                    break;
                case "abo":
                    authorities.add(new UserGroupAuthority(Roles.ABO.getRole()));
                    break;
                default:
                	authorities.add(new UserGroupAuthority(Roles.GPU.getRole()));
            }
        }
        return authorities;
    }
}
