package ch.steve84.stock_analyzer.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.DailyFundamental;

@RepositoryRestResource(collectionResourceRel = "dailyfundamental", path = "dailyfundamentals")
public interface DailyFundamentalRepository extends PagingAndSortingRepository<DailyFundamental, Integer> {
	List<DailyFundamental> findByStockId(@Param("stockId") Integer stockId);
}
