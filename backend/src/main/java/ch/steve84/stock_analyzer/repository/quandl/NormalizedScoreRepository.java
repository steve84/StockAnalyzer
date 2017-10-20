package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.domain.Pageable;
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
			+ "left join tstock s on s.stock_id = sn.stock_id "
			+ "left join vmarketcap mc on mc.stock_id = s.stock_id "
			+ "where sn.score_type_id = 1 and a.score_value is not null and "
			+ "(:excludeCountryIds is null or not cast(s.country_id as text) = any(string_to_array(cast(:excludeCountryIds as text), cast(',' as text)))) and "
			+ "(:excludeBranchIds is null or not cast(s.branch_id as text) = any(string_to_array(cast(:excludeBranchIds as text), cast(',' as text)))) and "
			+ "(:fromMarketCap is null or mc.market_capitalization >= cast(:fromMarketCap as integer)) and (:toMarketCap is null or mc.market_capitalization < cast(:toMarketCap as integer)) "
			+ "order by a.score_value desc "
			+ "limit :rows",
		   nativeQuery = true)
	List<NormalizedScore> getNormalizedScoresOfStocks(@Param("levermannFactor") Float levermannFactor,
			                                          @Param("magicFormulaFactor") Float magicFormulaFactor,
			                                          @Param("piotroskiFactor") Float piotroskiFactor,
			                                          @Param("excludeCountryIds") String countryIds,
			                                          @Param("excludeBranchIds") String branchIds,
			                                          @Param("fromMarketCap") Integer fromMarketCap,
			                                          @Param("toMarketCap") Integer toMarketCap,
			                                          @Param("rows") Integer rows);

	@Query(value = "select sn.score_id, null as score_type_id, null as stock_id, sn.index_id, a.score_value, null as modified_at from vscore_normalized sn "
			+ "left join (select sn1.index_id, sum(case when score_type_id = 1 then :levermannFactor * score_value when score_type_id = 2 then :magicFormulaFactor * score_value else :piotroskiFactor * score_value end) as score_value "
			+ "from vscore_normalized sn1 "
			+ "group by sn1.index_id) a on a.index_id = sn.index_id "
			+ "left join tindex i on i.index_id = sn.index_id "
			+ "where sn.score_type_id = 1 and a.score_value is not null and "
			+ "(:excludeCountryIds is null or i.country_id is null or not cast(i.country_id as text) = any(string_to_array(cast(:excludeCountryIds as text), cast(',' as text)))) "
			+ "order by a.score_value desc "
			+ "limit :rows",
		   nativeQuery = true)
	List<NormalizedScore> getNormalizedScoresOfIndices(@Param("levermannFactor") Float levermannFactor,
			                                           @Param("magicFormulaFactor") Float magicFormulaFactor,
			                                           @Param("piotroskiFactor") Float piotroskiFactor,
			                                           @Param("excludeCountryIds") String countryIds,
			                                           @Param("rows") Integer rows);



    @Query("select new ch.steve84.stock_analyzer.entity.quandl.NormalizedScore(ns.stock, sum(case when ns.scoreType.scoreTypeId = 1 then ns.scoreValue * :levermannFactor when ns.scoreType.scoreTypeId = 2 then ns.scoreValue * :magicFormulaFactor else ns.scoreValue * :piotroskiFactor)) "
         + "from NormalizedScore ns "
         + "left join MarketCapitalization mc on ns.stock.stockId = mc.stockId "
         + "where (:excludeCountryIds is null or ns.stock.country.countryId not in (:excludeCountryIds)) and "
         + "(:excludeBranchIds is null or ns.stock.branch.branchId not in (:excludeBranchIds)) and "
         + "(:fromMarketCap is null or mc.marketCapitalization >= :fromMarketCap) and (:toMarketCap is null or mc.marketCapitalization < :toMarketCap) "
         + "group by ns.stock.stockId")
    List<NormalizedScore> getNormalizedScoresOfStocksJPQL(@Param("levermannFactor") Float levermannFactor,
                                                          @Param("magicFormulaFactor") Float magicFormulaFactor,
                                                          @Param("piotroskiFactor") Float piotroskiFactor,
                                                          @Param("excludeCountryIds") String countryIds,
                                                          @Param("excludeBranchIds") String branchIds,
                                                          @Param("fromMarketCap") Integer fromMarketCap,
                                                          @Param("toMarketCap") Integer toMarketCap,
                                                          Pageable pageable);

    @Query("select new ch.steve84.stock_analyzer.entity.quandl.NormalizedScore(ns.index, sum(case when ns.scoreType.scoreTypeId = 1 then ns.scoreValue * :levermannFactor when ns.scoreType.scoreTypeId = 2 then ns.scoreValue * :magicFormulaFactor else ns.scoreValue * :piotroskiFactor)) "
         + "from NormalizedScore ns "
         + "where (:excludeCountryIds is null or ns.index.country is null or ns.index.country.countryId not in (:excludeCountryIds)) "
         + "group by ns.index.indexId")
    List<NormalizedScore> getNormalizedScoresOfIndicesJPQL(@Param("levermannFactor") Float levermannFactor,
                                                           @Param("magicFormulaFactor") Float magicFormulaFactor,
                                                           @Param("piotroskiFactor") Float piotroskiFactor,
                                                           @Param("excludeCountryIds") String countryIds,
                                                           Pageable pageable);
}
