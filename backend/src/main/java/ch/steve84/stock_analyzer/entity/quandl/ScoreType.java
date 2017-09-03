package ch.steve84.stock_analyzer.entity.quandl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tscoretype")
public class ScoreType {
	@Id
	@Column(name = "score_type_id")
	private Integer scoreTypeId;
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getScoreTypeId() {
		return scoreTypeId;
	}
}
