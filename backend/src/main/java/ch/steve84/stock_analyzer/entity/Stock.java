package ch.steve84.stock_analyzer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tstock")
public class Stock {
    @Id
    @GeneratedValue(generator="stock_seq")
    @SequenceGenerator(name="stock_seq",sequenceName="stock_seq", allocationSize=1)
    @Column(name = "stock_id")
    private Integer stockId;
    private String nsin;
    private String isin;
    private String wkn;
    private String symbol;
    private String url;
    @Column(name = "business_year_end")
    private String businessYearEnd;
    @Column(name = "country_id")
    private Integer countryId;
    @Column(name = "branch_id")
    private Integer branchId;
    private String name;
    
    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public String getNsin() {
        return nsin;
    }

    public void setNsin(String nsin) {
        this.nsin = nsin;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public String getWkn() {
        return wkn;
    }

    public void setWkn(String wkn) {
        this.wkn = wkn;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getBusinessYearEnd() {
        return businessYearEnd;
    }

    public void setBusinessYearEnd(String businessYearEnd) {
        this.businessYearEnd = businessYearEnd;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
