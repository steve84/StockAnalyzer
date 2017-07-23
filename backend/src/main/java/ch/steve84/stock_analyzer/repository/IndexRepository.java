package ch.steve84.stock_analyzer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Index;

@RepositoryRestResource(collectionResourceRel = "index", path = "indices")
public interface IndexRepository extends PagingAndSortingRepository<Index, Integer> {
	Page<Index> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueAsc(@Param("name") String name, Pageable pageable);
	Page<Index> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueDesc(@Param("name") String name, Pageable pageable);
}
