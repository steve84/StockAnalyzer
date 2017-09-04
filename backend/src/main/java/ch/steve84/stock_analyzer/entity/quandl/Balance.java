package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tbalance")
public class Balance {
    @Id
    @GeneratedValue(generator="balance_seq")
    @SequenceGenerator(name="balance_seq",sequenceName="balance_seq", allocationSize=1)
    @Column(name = "balance_id")
	private Integer balanceId;

    @Column(name = "stock_id")
    private Integer stockId;
    
    @Column(name = "current_assets")
    private Double currentAssets;

    @Column(name = "goodwill")
    private Double goodwill;

    @Column(name = "intangibles")
    private Double intangibles;

    @Column(name = "total_assets")
    private Double totalAssets;

    @Column(name = "current_liabilities")
    private Double currentLiabilities;

    @Column(name = "long_term_debt")
    private Double longTermDebt;

    @Column(name = "total_liabilities")
    private Double totalLiabilities;

    @Column(name = "shareholder_equity")
    private Double shareholderEquity;

    @Column(name = "modified_at")
	private Calendar modifiedAt;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getCurrentAssets() {
		return currentAssets;
	}

	public void setCurrentAssets(Double currentAssets) {
		this.currentAssets = currentAssets;
	}

	public Double getGoodwill() {
		return goodwill;
	}

	public void setGoodwill(Double goodwill) {
		this.goodwill = goodwill;
	}

	public Double getIntangibles() {
		return intangibles;
	}

	public void setIntangibles(Double intangibles) {
		this.intangibles = intangibles;
	}

	public Double getTotalAssets() {
		return totalAssets;
	}

	public void setTotalAssets(Double totalAssets) {
		this.totalAssets = totalAssets;
	}

	public Double getCurrentLiabilities() {
		return currentLiabilities;
	}

	public void setCurrentLiabilities(Double currentLiabilities) {
		this.currentLiabilities = currentLiabilities;
	}

	public Double getLongTermDebt() {
		return longTermDebt;
	}

	public void setLongTermDebt(Double longTermDebt) {
		this.longTermDebt = longTermDebt;
	}

	public Double getTotalLiabilities() {
		return totalLiabilities;
	}

	public void setTotalLiabilities(Double totalLiabilities) {
		this.totalLiabilities = totalLiabilities;
	}

	public Double getShareholderEquity() {
		return shareholderEquity;
	}

	public void setShareholderEquity(Double shareholderEquity) {
		this.shareholderEquity = shareholderEquity;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getBalanceId() {
		return balanceId;
	}
}
