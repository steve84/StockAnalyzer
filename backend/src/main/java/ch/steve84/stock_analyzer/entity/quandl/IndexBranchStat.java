package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "vindexbranchstat")
@IdClass(IndexBranchId.class)
public class IndexBranchStat {
	@Id
	@Column(name = "index_id")
	private Integer indexId;
	
	@Id
	@Column(name = "branch_id")
	private Integer branchId;
	
	@ManyToOne
	@JoinColumn(name = "branch_id", updatable = false, insertable = false, referencedColumnName = "branch_id")
	private Branch branch;
	
	private Integer nbr;
	private Double marketcap;
	public Branch getBranch() {
		return branch;
	}
	public void setBranch(Branch branch) {
		this.branch = branch;
	}
	public Integer getNbr() {
		return nbr;
	}
	public void setNbr(Integer nbr) {
		this.nbr = nbr;
	}
	public Double getMarketcap() {
		return marketcap;
	}
	public void setMarketcap(Double marketcap) {
		this.marketcap = marketcap;
	}
	public Integer getIndexId() {
		return indexId;
	}
	public Integer getBranchId() {
		return branchId;
	}
}
