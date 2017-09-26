package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.NormalizedScore;

@RepositoryRestResource(collectionResourceRel = "normalizedscore", path = "normalizedscores")
public interface NormalizedScoreRepository extends JpaRepository<NormalizedScore, Integer> {
	@Query(value = "select sn.score_id, null as score_type_id, sn.stock_id, null as index_id, a.score_value, null as modified_at from vscore_normalized sn "
			+ "left join (select sn1.stock_id, sum(case when score_type_id = 1 then :levermannFactor * score_value when score_type_id = 2 then :magicFormulaFactor * score_value else :piotroskiFactor * score_value end) as score_value "
			+ "from vscore_normalized sn1 "
			+ "group by sn1.stock_id) a on a.stock_id = sn.stock_id "
			+ "where sn.score_type_id = 1 and a.score_value is not null "
			+ "order by a.score_value desc "
			+ "limit :rows",
		   nativeQuery = true)
	List<NormalizedScore> getNormalizedScoresOfStocks(@Param("levermannFactor") Float levermannFactor,
			                                          @Param("magicFormulaFactor") Float magicFormulaFactor,
			                                          @Param("piotroskiFactor") Float piotroskiFactor,
			                                          @Param("rows") Integer rows);

	@Query(value = "select sn.score_id, null as score_type_id, null as stock_id, sn.index_id, a.score_value, null as modified_at from vscore_normalized sn "
			+ "left join (select sn1.index_id, sum(case when score_type_id = 1 then :levermannFactor * score_value when score_type_id = 2 then :magicFormulaFactor * score_value else :piotroskiFactor * score_value end) as score_value "
			+ "from vscore_normalized sn1 "
			+ "group by sn1.index_id) a on a.index_id = sn.index_id "
			+ "where sn.score_type_id = 1 and a.score_value is not null "
			+ "order by a.score_value desc "
			+ "limit :rows",
		   nativeQuery = true)
	List<NormalizedScore> getNormalizedScoresOfIndices(@Param("levermannFactor") Float levermannFactor,
			                                          @Param("magicFormulaFactor") Float magicFormulaFactor,
			                                          @Param("piotroskiFactor") Float piotroskiFactor,
			                                          @Param("rows") Integer rows);
}
