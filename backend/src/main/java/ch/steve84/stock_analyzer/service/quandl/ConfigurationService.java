package ch.steve84.stock_analyzer.service.quandl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigurationService {
    @Value("${jwt.expirationtime}")
    private long expirationTime;
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.token.prefix}")
    private String tokenPrefix;
    @Value("${jwt.header}")
    private String headerString;

    public long getExpirationTime() {
        return expirationTime;
    }

    public String getSecret() {
        return secret;
    }

    public String getTokenPrefix() {
        return tokenPrefix;
    }

    public String getHeaderString() {
        return headerString;
    }
}
