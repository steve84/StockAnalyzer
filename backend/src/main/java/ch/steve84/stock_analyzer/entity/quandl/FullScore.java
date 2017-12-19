package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "vfullscore")
public class FullScore {
    @Id
    @Column(name = "score_id")
    private Integer scoreId;
    
    @Column(name = "score_type_id")
    private Integer scoreTypeId;
    
    @Column(name = "stock_id")
    private Integer stockId;
    
    @Column(name = "index_id")
    private Integer indexId;
    
    @Column(name = "score_value")
    private Double scoreValue;
    @Column(name = "modified_at")
    private Calendar modifiedAt;


	public Integer getScoreTypeId() {
		return scoreTypeId;
	}

	public void setScoreTypeId(Integer scoreTypeId) {
		this.scoreTypeId = scoreTypeId;
	}

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Integer getIndexId() {
		return indexId;
	}

	public void setIndexId(Integer indexId) {
		this.indexId = indexId;
	}

	public Double getScoreValue() {
		return scoreValue;
	}

	public void setScoreValue(Double scoreValue) {
		this.scoreValue = scoreValue;
	}

	public Calendar getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Calendar modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Integer getScoreId() {
		return scoreId;
	}
}
