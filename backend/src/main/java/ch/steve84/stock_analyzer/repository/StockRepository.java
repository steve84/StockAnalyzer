package ch.steve84.stock_analyzer.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Stock;

@RepositoryRestResource(collectionResourceRel = "stock", path = "stocks")
public interface StockRepository extends PagingAndSortingRepository<Stock, Integer> {
	Page<Stock> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueAsc(@Param("name") String name, Pageable pageable);
	Page<Stock> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueDesc(@Param("name") String name, Pageable pageable);
	List<Stock> findByIsinContainingIgnoreCaseOrNameContainingIgnoreCase(@Param("isin") String isin, @Param("name") String name, Pageable pageable);
}
