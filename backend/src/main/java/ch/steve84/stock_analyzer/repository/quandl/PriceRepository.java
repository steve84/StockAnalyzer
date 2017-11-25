package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.Price;

@RepositoryRestResource(collectionResourceRel = "price", path = "price")
public interface PriceRepository extends ReadOnlyRepository<Price, Integer> {
	List<Price> findByStockIdOrderByCreatedAtAsc(@Param("stockId") Integer stockId);
	Price findFirst1ByStockIdOrderByCreatedAtAsc(@Param("stockId") Integer stockId);
}
