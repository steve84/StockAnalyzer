package ch.steve84.stock_analyzer.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.AnnualFundamental;

@RepositoryRestResource(collectionResourceRel = "annualfundamental", path = "annualfundamentals")
public interface AnnualFundamentalRepository extends PagingAndSortingRepository<AnnualFundamental, Integer> {
	List<AnnualFundamental> findByStockId(@Param("stockId") Integer stockId);
}
