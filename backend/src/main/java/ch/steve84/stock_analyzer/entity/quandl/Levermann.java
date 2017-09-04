package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vlevermann")
public class Levermann {
	
	@Id
	@Column(name = "stock_id")
	private Integer stockId;
	
	@Column(name = "roi_equity")
	private Double roiEquity;
	
	@Column(name = "roi_ebit_marge")
	private Double roiEbitMarge;
	
	@Column(name = "balance_sheet_equity_ratio")
	private Double balanceSheetEquityRatio;
	
	@Column(name = "market_capitalization")
	private Double marketCapitalization;
	
	@Column(name = "price_earnings_ratio")
	private Double priceEarningsRatio;
	
	@Column(name = "price_earnings_ratio_5y_avg")
	private Double priceEarningsRatio5YearAverage;
	
	@Column(name = "earnings_per_share_growth_expected")
	private Double earningsPerShareGrowthExpected;
	
	@Column(name = "analyst_sell_ratio")
	private Double analystSellRatio;
	
	@Column(name = "analyst_buy_ratio")
	private Double analystBuyRatio;
	
	@Column(name = "performance_6m")
	private Double performance6m;
	
	@Column(name = "performance_1y")
	private Double performance1y;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getRoiEquity() {
		return roiEquity;
	}

	public void setRoiEquity(Double roiEquity) {
		this.roiEquity = roiEquity;
	}

	public Double getRoiEbitMarge() {
		return roiEbitMarge;
	}

	public void setRoiEbitMarge(Double roiEbitMarge) {
		this.roiEbitMarge = roiEbitMarge;
	}

	public Double getBalanceSheetEquityRatio() {
		return balanceSheetEquityRatio;
	}

	public void setBalanceSheetEquityRatio(Double balanceSheetEquityRatio) {
		this.balanceSheetEquityRatio = balanceSheetEquityRatio;
	}

	public Double getMarketCapitalization() {
		return marketCapitalization;
	}

	public void setMarketCapitalization(Double marketCapitalization) {
		this.marketCapitalization = marketCapitalization;
	}

	public Double getPriceEarningsRatio() {
		return priceEarningsRatio;
	}

	public void setPriceEarningsRatio(Double priceEarningsRatio) {
		this.priceEarningsRatio = priceEarningsRatio;
	}

	public Double getPriceEarningsRatio5YearAverage() {
		return priceEarningsRatio5YearAverage;
	}

	public void setPriceEarningsRatio5YearAverage(Double priceEarningsRatio5YearAverage) {
		this.priceEarningsRatio5YearAverage = priceEarningsRatio5YearAverage;
	}

	public Double getEarningsPerShareGrowthExpected() {
		return earningsPerShareGrowthExpected;
	}

	public void setEarningsPerShareGrowthExpected(Double earningsPerShareGrowthExpected) {
		this.earningsPerShareGrowthExpected = earningsPerShareGrowthExpected;
	}

	public Double getAnalystSellRatio() {
		return analystSellRatio;
	}

	public void setAnalystSellRatio(Double analystSellRatio) {
		this.analystSellRatio = analystSellRatio;
	}

	public Double getAnalystBuyRatio() {
		return analystBuyRatio;
	}

	public void setAnalystBuyRatio(Double analystBuyRatio) {
		this.analystBuyRatio = analystBuyRatio;
	}

	public Double getPerformance6m() {
		return performance6m;
	}

	public void setPerformance6m(Double performance6m) {
		this.performance6m = performance6m;
	}

	public Double getPerformance1y() {
		return performance1y;
	}

	public void setPerformance1y(Double performance1y) {
		this.performance1y = performance1y;
	}
}
