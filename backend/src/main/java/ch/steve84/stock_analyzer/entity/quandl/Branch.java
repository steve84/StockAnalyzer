package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tbranch")
public class Branch {
    @Id
    @GeneratedValue(generator="branch_seq")
    @SequenceGenerator(name="branch_seq",sequenceName="branch_seq", allocationSize=1)
    @Column(name = "branch_id")
    private Integer branchId;
    private String name;
    @Column(name = "branch_group")
    private String branchGroup;
    @Column(name = "created_at")
    private Calendar createdAt;
    
    public Branch() {}
    
    public Branch(Integer branchId, String name) {
        super();
        this.branchId = branchId;
        this.name = name;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBranchGroup() {
		return branchGroup;
	}

	public void setBranchGroup(String branchGroup) {
		this.branchGroup = branchGroup;
	}

	public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }
}
