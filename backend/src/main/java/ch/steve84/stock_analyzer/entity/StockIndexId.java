package ch.steve84.stock_analyzer.entity;

import java.io.Serializable;

public class StockIndexId implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer stockId;
	private Integer indexId;
	
	@Override
	public int hashCode() {
		return stockId + indexId;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof StockIndexId) {
			StockIndexId otherId = (StockIndexId) obj;
			if (stockId == null ^ otherId.stockId == null  || indexId == null ^ otherId.indexId == null || indexId != null && !indexId.equals(otherId.indexId)  || stockId != null && !stockId.equals(otherId.stockId))
					return false;
			return true;
		}
		return false;
	}
}
