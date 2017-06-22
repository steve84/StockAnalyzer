package ch.steve84.stock_analyzer.entity;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tdailyfundamental")
public class DailyFundamental {
    @Id
    @GeneratedValue(generator="daily_fundamental_seq")
    @SequenceGenerator(name="daily_fundamental_seq",sequenceName="daily_fundamental_seq", allocationSize=1)
    @Column(name = "daily_fundamental_id")
    private Integer dailyFundamentalId;
    
    @Column(name = "earnings_per_share")
    private Double earningsPerShare;

    @Column(name = "earnings_per_share_growth_expected")
    private Double earningsPerShareGrowthExpected;

    @Column(name = "price_earnings_ratio")
    private Double priceEarningsRatio;
    
    @Column(name = "price_earnings_ratio_5y_avg")
    private Double priceEarningsRatio5YearAverage;

    @Column(name = "profit_growth_1year")
    private Double profitGrowthOneYear;
    
    @Column(name = "profit_peg")
    private Double profitPeg;
    
    @Column(name = "dividend_amount")
    private Double dividendAmount;
    
    @Column(name = "dividend_yield")
    private Double dividendYield;
    
    @Column(name = "cashflow_per_share")
    private Double cashflowPerShare;
    
    @Column(name = "cashflow_kcv")
    private Double cashflowKcv;

    @Column(name = "analyst_sell_ratio")
    private Double analystSellRation;

    @Column(name = "stock_id")
    private Integer stockId;
    
    @Column(name = "modified_at")
    private Calendar modifiedAt;

    public Double getEarningsPerShare() {
        return earningsPerShare;
    }

    public void setEarningsPerShare(Double earningsPerShare) {
        this.earningsPerShare = earningsPerShare;
    }

    public Double getEarningsPerShareGrowthExpected() {
        return earningsPerShareGrowthExpected;
    }

    public void setEarningsPerShareGrowthExpected(Double earningsPerShareGrowthExpected) {
        this.earningsPerShareGrowthExpected = earningsPerShareGrowthExpected;
    }
    
    public Double getPriceEarningsRatio() {
        return priceEarningsRatio;
    }

    public Double getPriceEarningsRatio5YearAverage() {
        return priceEarningsRatio5YearAverage;
    }

    public void setPriceEarningsRatio5YearAverage(Double priceEarningsRatio5YearAverage) {
        this.priceEarningsRatio5YearAverage = priceEarningsRatio5YearAverage;
    }

    public void setPriceEarningsRatio(Double priceEarningsRatio) {
        this.priceEarningsRatio = priceEarningsRatio;
    }

    public Double getProfitGrowthOneYear() {
        return profitGrowthOneYear;
    }

    public void setProfitGrowthOneYear(Double profitGrowthOneYear) {
        this.profitGrowthOneYear = profitGrowthOneYear;
    }

    public Double getProfitPeg() {
        return profitPeg;
    }

    public void setProfitPeg(Double profitPeg) {
        this.profitPeg = profitPeg;
    }

    public Double getDividendAmount() {
        return dividendAmount;
    }

    public void setDividendAmount(Double dividendAmount) {
        this.dividendAmount = dividendAmount;
    }

    public Double getDividendYield() {
        return dividendYield;
    }

    public void setDividendYield(Double dividendYield) {
        this.dividendYield = dividendYield;
    }

    public Double getCashflowPerShare() {
        return cashflowPerShare;
    }

    public void setCashflowPerShare(Double cashflowPerShare) {
        this.cashflowPerShare = cashflowPerShare;
    }

    public Double getCashflowKcv() {
        return cashflowKcv;
    }

    public void setCashflowKcv(Double cashflowKcv) {
        this.cashflowKcv = cashflowKcv;
    }

    public Double getAnalystSellRation() {
        return analystSellRation;
    }

    public void setAnalystSellRation(Double analystSellRation) {
        this.analystSellRation = analystSellRation;
    }

    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public Calendar getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Calendar modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Integer getDailyFundamentalId() {
        return dailyFundamentalId;
    }

}
