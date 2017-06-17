package ch.steve84.stock_analyzer.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.TechnicalData;

@RepositoryRestResource(collectionResourceRel = "technicaldata", path = "technicaldata")
public interface TechnicalDataRepository extends PagingAndSortingRepository<TechnicalData, Integer> {
	List<TechnicalData> findByStockId(@Param("stockId") Integer stockId);
}
