package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tvalues")
public class Values {
    @Id
    @GeneratedValue(generator="values_seq")
    @SequenceGenerator(name="values_seq",sequenceName="values_seq", allocationSize=1)
    @Column(name = "values_id")
	private Integer valuesId;

    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "price_earnings_ratio")
    private Double priceEarningsRatio;

    @Column(name = "price_cashflow_ratio")
    private Double priceCashflowRatio;

    @Column(name = "price_book_ratio")
    private Double priceBookRatio;

    @Column(name = "peg_ratio")
    private Double pegRatio;

    @Column(name = "enterprise_ratio")
    private Double enterpriseRatio;

    @Column(name = "price_52_wk")
    private Double price52Wk;

    @Column(name = "graham_multiplier")
    private Double grahamMultiplier;

    @Column(name = "robur_score")
    private Double roburScore;

    @Column(name = "current_yield")
    private Double currentYield;

    @Column(name = "market_capitalization")
    private Double marketCapitalization;

    @Column(name = "modified_at")
    private Calendar modifiedAt;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getPriceEarningsRatio() {
		return priceEarningsRatio;
	}

	public void setPriceEarningsRatio(Double priceEarningsRatio) {
		this.priceEarningsRatio = priceEarningsRatio;
	}

	public Double getPriceCashflowRatio() {
		return priceCashflowRatio;
	}

	public void setPriceCashflowRatio(Double priceCashflowRatio) {
		this.priceCashflowRatio = priceCashflowRatio;
	}

	public Double getPriceBookRatio() {
		return priceBookRatio;
	}

	public void setPriceBookRatio(Double priceBookRatio) {
		this.priceBookRatio = priceBookRatio;
	}

	public Double getPegRatio() {
		return pegRatio;
	}

	public void setPegRatio(Double pegRatio) {
		this.pegRatio = pegRatio;
	}

	public Double getEnterpriseRatio() {
		return enterpriseRatio;
	}

	public void setEnterpriseRatio(Double enterpriseRatio) {
		this.enterpriseRatio = enterpriseRatio;
	}

	public Double getPrice52Wk() {
		return price52Wk;
	}

	public void setPrice52Wk(Double price52Wk) {
		this.price52Wk = price52Wk;
	}

	public Double getGrahamMultiplier() {
		return grahamMultiplier;
	}

	public void setGrahamMultiplier(Double grahamMultiplier) {
		this.grahamMultiplier = grahamMultiplier;
	}

	public Double getRoburScore() {
		return roburScore;
	}

	public void setRoburScore(Double roburScore) {
		this.roburScore = roburScore;
	}

	public Double getCurrentYield() {
		return currentYield;
	}

	public void setCurrentYield(Double currentYield) {
		this.currentYield = currentYield;
	}

	public Double getMarketCapitalization() {
		return marketCapitalization;
	}

	public void setMarketCapitalization(Double marketCapitalization) {
		this.marketCapitalization = marketCapitalization;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getValuesId() {
		return valuesId;
	}
}
