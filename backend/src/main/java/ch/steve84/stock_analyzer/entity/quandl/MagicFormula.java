package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vmagicformula")
public class MagicFormula {
	@Id
    @Column(name = "stock_id")
    private Integer stockId;
	
	@Column(name = "return_on_capital")
	private Double returnOnCapital;
	
	@Column(name = "earnings_yield")
	private Double earningsYield;
	
	@Column(name = "market_capitalization")
	private Double marketCapitalization;

	public Double getReturnOnCapital() {
		return returnOnCapital;
	}

	public void setReturnOnCapital(Double returnOnCapital) {
		this.returnOnCapital = returnOnCapital;
	}

	public Double getEarningsYield() {
		return earningsYield;
	}

	public void setEarningsYield(Double earningsYield) {
		this.earningsYield = earningsYield;
	}

	public Double getMarketCapitalization() {
		return marketCapitalization;
	}

	public void setMarketCapitalization(Double marketCapitalization) {
		this.marketCapitalization = marketCapitalization;
	}

	public Integer getStockId() {
		return stockId;
	}

}
