package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vpiotroski")
public class Piotroski {
	@Id
    @Column(name = "stock_id")
    private Integer stockId;

	@Column(name = "return_on_assets")
	private Double returnOnAssets;

	@Column(name = "cash_operations")
	private Double cashOperations;

	@Column(name = "actual_return_on_assets")
	private Double actualReturnOnAssets;

	@Column(name = "last_return_on_assets")
	private Double lastReturnOnAssets;

	@Column(name = "actual_long_term_ratio")
	private Double actualLongTermRatio;

	@Column(name = "last_long_term_ratio")
	private Double lastLongTermRatio;

	@Column(name = "actual_current_ratio")
	private Double actualCurrentRatio;

	@Column(name = "last_current_ratio")
	private Double lastCurrentRatio;

	@Column(name = "actual_shares_outstanding")
	private Double actualSharesOutstanding;

	@Column(name = "last_shares_outstanding")
	private Double lastSharesOutstanding;

	@Column(name = "actual_asset_turnover")
	private Double actualAssetTurnover;

	@Column(name = "last_asset_turnover")
	private Double lastAssetTurnover;

	@Column(name = "market_capitalization")
	private Double marketCapitalization;

	public Double getReturnOnAssets() {
        return returnOnAssets;
    }

    public void setReturnOnAssets(Double returnOnAssets) {
        this.returnOnAssets = returnOnAssets;
    }

    public Double getCashOperations() {
		return cashOperations;
	}

	public void setCashOperations(Double cashOperations) {
		this.cashOperations = cashOperations;
	}

	public Double getActualReturnOnAssets() {
		return actualReturnOnAssets;
	}

	public void setActualReturnOnAssets(Double actualReturnOnAssets) {
		this.actualReturnOnAssets = actualReturnOnAssets;
	}

	public Double getLastReturnOnAssets() {
		return lastReturnOnAssets;
	}

	public void setLastReturnOnAssets(Double lastReturnOnAssets) {
		this.lastReturnOnAssets = lastReturnOnAssets;
	}

	public Double getActualLongTermRatio() {
		return actualLongTermRatio;
	}

	public void setActualLongTermRatio(Double actualLongTermRatio) {
		this.actualLongTermRatio = actualLongTermRatio;
	}

	public Double getLastLongTermRatio() {
		return lastLongTermRatio;
	}

	public void setLastLongTermRatio(Double lastLongTermRatio) {
		this.lastLongTermRatio = lastLongTermRatio;
	}

	public Double getActualCurrentRatio() {
		return actualCurrentRatio;
	}

	public void setActualCurrentRatio(Double actualCurrentRatio) {
		this.actualCurrentRatio = actualCurrentRatio;
	}

	public Double getLastCurrentRatio() {
		return lastCurrentRatio;
	}

	public void setLastCurrentRatio(Double lastCurrentRatio) {
		this.lastCurrentRatio = lastCurrentRatio;
	}

	public Double getActualSharesOutstanding() {
		return actualSharesOutstanding;
	}

	public void setActualSharesOutstanding(Double actualSharesOutstanding) {
		this.actualSharesOutstanding = actualSharesOutstanding;
	}

	public Double getLastSharesOutstanding() {
		return lastSharesOutstanding;
	}

	public void setLastSharesOutstanding(Double lastSharesOutstanding) {
		this.lastSharesOutstanding = lastSharesOutstanding;
	}

	public Double getActualAssetTurnover() {
		return actualAssetTurnover;
	}

	public void setActualAssetTurnover(Double actualAssetTurnover) {
		this.actualAssetTurnover = actualAssetTurnover;
	}

	public Double getLastAssetTurnover() {
		return lastAssetTurnover;
	}

	public void setLastAssetTurnover(Double lastAssetTurnover) {
		this.lastAssetTurnover = lastAssetTurnover;
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
