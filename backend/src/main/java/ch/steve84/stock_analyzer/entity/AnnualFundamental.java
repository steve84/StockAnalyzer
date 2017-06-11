package ch.steve84.stock_analyzer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tannualfundamental")
public class AnnualFundamental {
	@Id
	@GeneratedValue(generator="annual_fundamental_seq")
	@SequenceGenerator(name="annual_fundamental_seq",sequenceName="annual_fundamental_seq", allocationSize=1)
	@Column(name = "annual_fundamental_id")
	private Integer annaulFundamentalId;
	
	@Column(name = "turnover")
	private Double turnover;
	
	@Column(name = "turnover_growth_1year")
	private Double turnoverGrowthOneYear;
	
	@Column(name = "turnover_employee")
	private Double turnoverEmployee;
	
	@Column(name = "bookvalue_per_share")
	private Double bookvaluePerShare;
	
	@Column(name = "bookvalue_price_ratio")
	private Double bookvaluePriceRatio;
	
	@Column(name = "balance_sheet_total")
	private Double balanceSheetTotal;
	
	@Column(name = "balance_sheet_equity_ratio")
	private Double balanceSheetEquityRatio;
	
	@Column(name = "balance_sheet_equity_dept")
	private Double balanceSheetEquityDept;
	
	@Column(name = "balance_sheet_equity_dynamic_dept")
	private Double balanceSheetEquityDynamicDept;
	
	@Column(name = "accounting_method")
	private Double accountingMethod;
	
	@Column(name = "market_capitalization")
	private Double marketCapitalization;
	
	@Column(name = "market_capitalization_turnover")
	private Double marketCapitalizationTurnover;
	
	@Column(name = "market_capitalization_employee")
	private Double marketCapitalizationEmployee;
	
	@Column(name = "market_capitalization_ebitda")
	private Double marketCapitalizationEbitda;
	
	@Column(name = "roi_cashflow_marge")
	private Double roiCashflowMarge;
	
	@Column(name = "roi_ebit_marge")
	private Double roiEbitMarge;
	
	@Column(name = "roi_ebitda_marge")
	private Double roiEbitdaMarge;
	
	@Column(name = "roi_equity")
	private Double roiEquity;
	
	@Column(name = "roi_total_capital")
	private Double roiTotalCapital;
	
	@Column(name = "roi_cashflow")
	private Double roiCashflow;
	
	@Column(name = "roi_tax_quote")
	private Double roiTaxQuote;
	
	@Column(name = "year_value")
	private Integer yearValue;
	
	@Column(name = "stock_id")
	private Integer stockId;

	public Integer getAnnaulFundamentalId() {
		return annaulFundamentalId;
	}

	public Double getTurnover() {
		return turnover;
	}

	public void setTurnover(Double turnover) {
		this.turnover = turnover;
	}

	public Double getTurnoverGrowthOneYear() {
		return turnoverGrowthOneYear;
	}

	public void setTurnoverGrowthOneYear(Double turnoverGrowthOneYear) {
		this.turnoverGrowthOneYear = turnoverGrowthOneYear;
	}

	public Double getTurnoverEmployee() {
		return turnoverEmployee;
	}

	public void setTurnoverEmployee(Double turnoverEmployee) {
		this.turnoverEmployee = turnoverEmployee;
	}

	public Double getBookvaluePerShare() {
		return bookvaluePerShare;
	}

	public void setBookvaluePerShare(Double bookvaluePerShare) {
		this.bookvaluePerShare = bookvaluePerShare;
	}

	public Double getBookvaluePriceRatio() {
		return bookvaluePriceRatio;
	}

	public void setBookvaluePriceRatio(Double bookvaluePriceRatio) {
		this.bookvaluePriceRatio = bookvaluePriceRatio;
	}

	public Double getBalanceSheetTotal() {
		return balanceSheetTotal;
	}

	public void setBalanceSheetTotal(Double balanceSheetTotal) {
		this.balanceSheetTotal = balanceSheetTotal;
	}

	public Double getBalanceSheetEquityRatio() {
		return balanceSheetEquityRatio;
	}

	public void setBalanceSheetEquityRatio(Double balanceSheetEquityRatio) {
		this.balanceSheetEquityRatio = balanceSheetEquityRatio;
	}

	public Double getBalanceSheetEquityDept() {
		return balanceSheetEquityDept;
	}

	public void setBalanceSheetEquityDept(Double balanceSheetEquityDept) {
		this.balanceSheetEquityDept = balanceSheetEquityDept;
	}

	public Double getBalanceSheetEquityDynamicDept() {
		return balanceSheetEquityDynamicDept;
	}

	public void setBalanceSheetEquityDynamicDept(Double balanceSheetEquityDynamicDept) {
		this.balanceSheetEquityDynamicDept = balanceSheetEquityDynamicDept;
	}

	public Double getAccountingMethod() {
		return accountingMethod;
	}

	public void setAccountingMethod(Double accountingMethod) {
		this.accountingMethod = accountingMethod;
	}

	public Double getMarketCapitalization() {
		return marketCapitalization;
	}

	public void setMarketCapitalization(Double marketCapitalization) {
		this.marketCapitalization = marketCapitalization;
	}

	public Double getMarketCapitalizationTurnover() {
		return marketCapitalizationTurnover;
	}

	public void setMarketCapitalizationTurnover(Double marketCapitalizationTurnover) {
		this.marketCapitalizationTurnover = marketCapitalizationTurnover;
	}

	public Double getMarketCapitalizationEmployee() {
		return marketCapitalizationEmployee;
	}

	public void setMarketCapitalizationEmployee(Double marketCapitalizationEmployee) {
		this.marketCapitalizationEmployee = marketCapitalizationEmployee;
	}

	public Double getMarketCapitalizationEbitda() {
		return marketCapitalizationEbitda;
	}

	public void setMarketCapitalizationEbitda(Double marketCapitalizationEbitda) {
		this.marketCapitalizationEbitda = marketCapitalizationEbitda;
	}

	public Double getRoiCashflowMarge() {
		return roiCashflowMarge;
	}

	public void setRoiCashflowMarge(Double roiCashflowMarge) {
		this.roiCashflowMarge = roiCashflowMarge;
	}

	public Double getRoiEbitMarge() {
		return roiEbitMarge;
	}

	public void setRoiEbitMarge(Double roiEbitMarge) {
		this.roiEbitMarge = roiEbitMarge;
	}

	public Double getRoiEbitdaMarge() {
		return roiEbitdaMarge;
	}

	public void setRoiEbitdaMarge(Double roiEbitdaMarge) {
		this.roiEbitdaMarge = roiEbitdaMarge;
	}

	public Double getRoiEquity() {
		return roiEquity;
	}

	public void setRoiEquity(Double roiEquity) {
		this.roiEquity = roiEquity;
	}

	public Double getRoiTotalCapital() {
		return roiTotalCapital;
	}

	public void setRoiTotalCapital(Double roiTotalCapital) {
		this.roiTotalCapital = roiTotalCapital;
	}

	public Double getRoiCashflow() {
		return roiCashflow;
	}

	public void setRoiCashflow(Double roiCashflow) {
		this.roiCashflow = roiCashflow;
	}

	public Double getRoiTaxQuote() {
		return roiTaxQuote;
	}

	public void setRoiTaxQuote(Double roiTaxQuote) {
		this.roiTaxQuote = roiTaxQuote;
	}

	public Integer getYearValue() {
		return yearValue;
	}

	public void setYearValue(Integer yearValue) {
		this.yearValue = yearValue;
	}

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}
	
	
}
