package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "trole")
public class Role {
    @Id
    @GeneratedValue(generator="role_seq")
    @SequenceGenerator(name="role_seq",sequenceName="role_seq", allocationSize=1)
    @Column(name = "role_id")
	private Integer roleId;
    @Column(name = "role_name")
	private String roleName;

    public Role() {}

    public Role(Integer roleId, String roleName) {
        super();
        this.roleId = roleId;
        this.roleName = roleName;
    }

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getRoleId() {
		return roleId;
	}

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
