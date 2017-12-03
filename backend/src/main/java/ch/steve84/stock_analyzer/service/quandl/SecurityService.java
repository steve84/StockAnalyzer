package ch.steve84.stock_analyzer.service.quandl;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Base64.Encoder;

import org.apache.commons.text.CharacterPredicates;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecurityService {
	
	@Value("${jwt.expirationtime}")
	private long expirationTime;
	@Value("${jwt.secret}")
	private String secret;
	@Value("${jwt.token.prefix}")
	private String prefix;
	@Value("${jwt.header}")
	private String header;
	@Value("${google.captcha.secret}")
	private String captchaSecret;

    public String hashAndSalt(String password, String salt) {
    	if (password != null && salt != null) {
	    	try {
	    		MessageDigest msgDigest = MessageDigest.getInstance("SHA-256");
	    		Encoder encoder = Base64.getEncoder();
	    		String hashPassword = encoder.encodeToString(msgDigest.digest(password.getBytes("UTF-8")));
	    		return encoder.encodeToString(msgDigest.digest((hashPassword + salt).getBytes("UTF-8")));
	    	} catch (NoSuchAlgorithmException e) {
				return null;
			} catch (UnsupportedEncodingException e) {
				return null;
			}
    	}
    	return null;
    }
    
    public String generateRandomString(int length) {
    	RandomStringGenerator randomStringGenerator = new RandomStringGenerator.Builder()
    	                .withinRange('0', 'z')
    	                .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
    	                .build();
        return randomStringGenerator.generate(length);
    }

	public long getExpirationTime() {
		return expirationTime;
	}

	public String getSecret() {
		return secret;
	}

	public String getPrefix() {
		return prefix;
	}

	public String getHeader() {
		return header;
	}

	public String getCaptchaSecret() {
		return captchaSecret;
	}
}
