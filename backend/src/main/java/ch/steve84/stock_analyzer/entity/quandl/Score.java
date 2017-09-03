package ch.steve84.stock_analyzer.entity.quandl;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tscore")
public class Score {
    @Id
    @GeneratedValue(generator="score_seq")
    @SequenceGenerator(name="score_seq",sequenceName="score_seq", allocationSize=1)
    @Column(name = "score_id")
    private Integer scoreId;
    
    @ManyToOne
    @JoinColumn(name = "score_type_id")
    private ScoreType scoreType;
    
    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;
    
    @ManyToOne
    @JoinColumn(name = "index_id")
    private Index index;
    
    @Column(name = "score_value")
    private Double scoreValue;
    @Column(name = "modified_at")
    private Calendar modifiedAt;

	public ScoreType getScoreType() {
		return scoreType;
	}

	public void setScoreType(ScoreType scoreType) {
		this.scoreType = scoreType;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Index getIndex() {
		return index;
	}

	public void setIndex(Index index) {
		this.index = index;
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
