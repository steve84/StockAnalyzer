package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@NamedQueries({
@NamedQuery(name = "User.findByUsername", query = "select u from User u where u.username = :username")
})
@Table(name = "tuser")
public class User {
    @Id
    @GeneratedValue(generator="user_seq")
    @SequenceGenerator(name="user_seq",sequenceName="user_seq", allocationSize=1)
    @Column(name = "user_id")
	private Integer userId;
	private String username;
	private String email;
	@Column(name = "correspondence_language")
	private String language;
	private String password;
	private String salt;
	private String token;
	@Column(name = "is_activated")
	private Boolean isActivated;
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
    @Column(name = "created_at")
    private Calendar createdAt;
    @Column(name = "activated_at")
    private Calendar activatedAt;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLanguage() {
    	if (language == null)
    		return "de";
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Boolean isActivated() {
        return isActivated;
    }

    public void setIsActivated(Boolean isActivated) {
        this.isActivated = isActivated;
    }

    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

    public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }

	public Calendar getActivatedAt() {
        return activatedAt;
    }

    public void setActivatedAt(Calendar activatedAt) {
        this.activatedAt = activatedAt;
    }

    public Integer getUserId() {
		return userId;
	}
}
