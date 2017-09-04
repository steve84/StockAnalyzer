package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tforecast")
public class Forecast {
    @Id
    @GeneratedValue(generator="forecast_seq")
    @SequenceGenerator(name="forecast_seq",sequenceName="forecast_seq", allocationSize=1)
    @Column(name = "forecast_id")	
	private Integer forecastId;

    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "revenue")
    private Double revenue;

    @Column(name = "operating_income")
    private Double operatingIncome;

    @Column(name = "net_income_exc")
    private Double netIncomeExc;

    @Column(name = "cash_operations")
    private Double cashOperations;

    @Column(name = "depreciation")
    private Double depreciation;

    @Column(name = "capex")
    private Double capex;

    @Column(name = "start_cash")
    private Double startCash;

    @Column(name = "end_cash")
    private Double endCash;

    @Column(name = "eps_exc")
    private Double epsExc;

    @Column(name = "dividend")
    private Double dividend;

    @Column(name = "modified_at")
    private Calendar modifiedAt;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Double getRevenue() {
		return revenue;
	}

	public void setRevenue(Double revenue) {
		this.revenue = revenue;
	}

	public Double getOperatingIncome() {
		return operatingIncome;
	}

	public void setOperatingIncome(Double operatingIncome) {
		this.operatingIncome = operatingIncome;
	}

	public Double getNetIncomeExc() {
		return netIncomeExc;
	}

	public void setNetIncomeExc(Double netIncomeExc) {
		this.netIncomeExc = netIncomeExc;
	}

	public Double getCashOperations() {
		return cashOperations;
	}

	public void setCashOperations(Double cashOperations) {
		this.cashOperations = cashOperations;
	}

	public Double getDepreciation() {
		return depreciation;
	}

	public void setDepreciation(Double depreciation) {
		this.depreciation = depreciation;
	}

	public Double getCapex() {
		return capex;
	}

	public void setCapex(Double capex) {
		this.capex = capex;
	}

	public Double getStartCash() {
		return startCash;
	}

	public void setStartCash(Double startCash) {
		this.startCash = startCash;
	}

	public Double getEndCash() {
		return endCash;
	}

	public void setEndCash(Double endCash) {
		this.endCash = endCash;
	}

	public Double getEpsExc() {
		return epsExc;
	}

	public void setEpsExc(Double epsExc) {
		this.epsExc = epsExc;
	}

	public Double getDividend() {
		return dividend;
	}

	public void setDividend(Double dividend) {
		this.dividend = dividend;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getForecastId() {
		return forecastId;
	}

}
