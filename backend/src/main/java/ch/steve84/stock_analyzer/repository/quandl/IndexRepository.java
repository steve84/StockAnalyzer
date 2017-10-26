package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.Index;

@RepositoryRestResource(collectionResourceRel = "index", path = "indices")
public interface IndexRepository extends ReadOnlyRepository<Index, Integer> {
	Page<Index> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueAsc(@Param("name") String name, Pageable pageable);
	Page<Index> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueDesc(@Param("name") String name, Pageable pageable);
	@Query("select i from Index i")
	List<Index> getAllIndices();
	
//	List<Index> findByPublicIndexTrue();
	Page<Index> findByPublicIndexTrue(Pageable pageable);
	Index findByIndexId(Integer indexId);
//	List<Index> findByPublicIndexTrue(Sort sort);
}
