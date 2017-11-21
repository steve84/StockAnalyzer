package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tanalysts")
public class Analysts {
    @Id
    @GeneratedValue(generator="analysts_seq")
    @SequenceGenerator(name="analysts_seq",sequenceName="analysts_seq", allocationSize=1)
    @Column(name = "analysts_id")
    private Integer analystsId;

    @OneToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private Double buy;
    private Double sell;
    private Double hold;

    @Column(name = "modified_at")
    private Calendar modifiedAt;

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Double getBuy() {
		return buy;
	}

	public void setBuy(Double buy) {
		this.buy = buy;
	}

	public Double getSell() {
		return sell;
	}

	public void setSell(Double sell) {
		this.sell = sell;
	}

	public Double getHold() {
		return hold;
	}

	public void setHold(Double hold) {
		this.hold = hold;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getAnalystsId() {
		return analystsId;
	}

}
