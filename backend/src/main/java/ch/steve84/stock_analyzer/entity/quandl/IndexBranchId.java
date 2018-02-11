package ch.steve84.stock_analyzer.entity.quandl;

import java.io.Serializable;

public class IndexBranchId implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer indexId;
	private Integer branchId;
	
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return super.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof IndexBranchId))
			return false;
		IndexBranchId indexObj = (IndexBranchId) obj;
		return indexObj.getBranchId().equals(branchId) && indexObj.getIndexId().equals(indexId);
	}

	public Integer getIndexId() {
		return indexId;
	}

	public Integer getBranchId() {
		return branchId;
	}

}
