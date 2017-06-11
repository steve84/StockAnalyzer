package ch.steve84.stock_analyzer.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Stock;

@RepositoryRestResource(collectionResourceRel = "stock", path = "stocks")
public interface StockRepository extends PagingAndSortingRepository<Stock, Integer> {
	List<Stock> findByCountryId(@Param("countryId") Integer countryId);
}
