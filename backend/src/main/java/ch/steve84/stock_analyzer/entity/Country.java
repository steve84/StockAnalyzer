package ch.steve84.stock_analyzer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tcountry")
public class Country {
	@Id
	@GeneratedValue(generator="country_seq")
	@SequenceGenerator(name="country_seq",sequenceName="country_seq", allocationSize=1)
	@Column(name = "country_id")
	private Integer countryId;
	private String name;
	private String code;
	
	public Country() {}
	
	public Country(Integer countryId, String name, String code) {
		this.countryId = countryId;
		this.name = name;
		this.code = code;
	}

	public Integer getCountryId() {
		return countryId;
	}

	public void setCountryId(Integer countryId) {
		this.countryId = countryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
