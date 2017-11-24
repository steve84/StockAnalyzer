package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tprice")
public class Price {
    @Id
    @GeneratedValue(generator="price_seq")
    @SequenceGenerator(name="price_seq",sequenceName="price_seq", allocationSize=1)
    @Column(name = "price_id")
    private Integer priceId;

    @Column(name = "stock_id")
    private Integer stockId;

    @Column(name = "index_id")
    private Integer indexId;
    
    private Double price;
    private String currency;

    @Column(name = "quandl_code")
    private String quandlCode;

    @Column(name = "created_at")
    private Calendar createdAt;

    public Integer getPriceId() {
        return priceId;
    }

    public void setPriceId(Integer priceId) {
        this.priceId = priceId;
    }

    public Integer getIndexId() {
        return indexId;
    }

    public void setIndexId(Integer indexId) {
        this.indexId = indexId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getQuandlCode() {
        return quandlCode;
    }

    public void setQuandlCode(String quandlCode) {
        this.quandlCode = quandlCode;
    }

    public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getStockId() {
        return stockId;
    }
}
