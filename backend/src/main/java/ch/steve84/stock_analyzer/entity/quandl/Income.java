package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "tincome")
public class Income {
    @Id
    @GeneratedValue(generator="income_seq")
    @SequenceGenerator(name="income_seq",sequenceName="income_seq", allocationSize=1)
    @Column(name = "income_id")
    private Integer incomeId;
    
    @Column(name = "stock_id")
    private Integer stockId;
    
    @Column(name = "revenue")
    private Double revenue;

    @Column(name = "operating_revenue")
    private Double operatingRevenue;

    @Column(name = "net_income_exc")
    private Double netIncomeExc;

    @Column(name = "net_income_inc")
    private Double netIncomeInc;

    @Column(name = "eps_exc")
    private Double epsExc;

    @Column(name = "eps_inc")
    private Double epsInc;

    @Column(name = "dividend")
    private Double dividend;
    
    @Transient
    private Double dividendYield;

    @Column(name = "diluted_shares_os")
    private Double dilutedSharesOs;

    @Column(name = "historic_yield")
    private Double historicYield;

    @Column(name = "share_price_eop")
    private Double sharePriceEop;

    @Column(name = "last_share_price")
    private Double lastSharePrice;

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

	public Double getOperatingRevenue() {
		return operatingRevenue;
	}

	public void setOperatingRevenue(Double operatingRevenue) {
		this.operatingRevenue = operatingRevenue;
	}

	public Double getNetIncomeExc() {
		return netIncomeExc;
	}

	public void setNetIncomeExc(Double netIncomeExc) {
		this.netIncomeExc = netIncomeExc;
	}

	public Double getNetIncomeInc() {
		return netIncomeInc;
	}

	public void setNetIncomeInc(Double netIncomeInc) {
		this.netIncomeInc = netIncomeInc;
	}

	public Double getEpsExc() {
		return epsExc;
	}

	public void setEpsExc(Double epsExc) {
		this.epsExc = epsExc;
	}

	public Double getEpsInc() {
		return epsInc;
	}

	public void setEpsInc(Double epsInc) {
		this.epsInc = epsInc;
	}

	public Double getDividend() {
		return dividend;
	}

	public void setDividend(Double dividend) {
		this.dividend = dividend;
	}

	public Double getDividendYield() {
		if (getDividend() != null && getSharePriceEop() != null && getSharePriceEop() != 0)
			return getDividend() / getSharePriceEop();
		return null;
	}

	public void setDividendYield(Double dividendYield) {
		this.dividendYield = dividendYield;
	}

	public Double getDilutedSharesOs() {
		return dilutedSharesOs;
	}

	public void setDilutedSharesOs(Double dilutedSharesOs) {
		this.dilutedSharesOs = dilutedSharesOs;
	}

	public Double getHistoricYield() {
		return historicYield;
	}

	public void setHistoricYield(Double historicYield) {
		this.historicYield = historicYield;
	}

	public Double getSharePriceEop() {
		return sharePriceEop;
	}

	public void setSharePriceEop(Double sharePriceEop) {
		this.sharePriceEop = sharePriceEop;
	}

	public Double getLastSharePrice() {
		return lastSharePrice;
	}

	public void setLastSharePrice(Double lastSharePrice) {
		this.lastSharePrice = lastSharePrice;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getIncomeId() {
		return incomeId;
	}
}
