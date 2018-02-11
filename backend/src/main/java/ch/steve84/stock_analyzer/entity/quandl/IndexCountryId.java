package ch.steve84.stock_analyzer.entity.quandl;

import java.io.Serializable;

public class IndexCountryId implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer indexId;
	private Integer countryId;

	@Override
	public int hashCode() {
		return indexId + countryId;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof IndexCountryId))
			return false;
		IndexCountryId indexObj = (IndexCountryId) obj;
		return indexObj.getCountryId().equals(countryId) && indexObj.getIndexId().equals(indexId);
	}

	public Integer getIndexId() {
		return indexId;
	}

	public Integer getCountryId() {
		return countryId;
	}
}
