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
    @Query("select new ch.steve84.stock_analyzer.entity.quandl.NormalizedScore(max(ns.scoreId), ns.stock, sum(case when ns.scoreType.scoreTypeId = 1 then (ns.scoreValue * :levermannFactor) when ns.scoreType.scoreTypeId = 2 then (ns.scoreValue * :magicFormulaFactor) else (ns.scoreValue * :piotroskiFactor) end)) "
         + "from NormalizedScore ns, MarketCapitalization mc "
         + "where ns.stock.stockId = mc.stockId and "
         + "ns.stock.country.countryId not in :excludeCountryIds and "
         + "ns.stock.branch.branchId not in :excludeBranchIds and "
         + "(:fromMarketCap is null or (mc.marketCapitalization * 1000) >= :fromMarketCap) and (:toMarketCap is null or (mc.marketCapitalization * 1000) < :toMarketCap) "
         + "group by ns.stock.stockId")
    List<NormalizedScore> getNormalizedScoresOfStocks(@Param("levermannFactor") Double levermannFactor,
                                                      @Param("magicFormulaFactor") Double magicFormulaFactor,
                                                      @Param("piotroskiFactor") Double piotroskiFactor,
                                                      @Param("excludeCountryIds") List<Integer> countryIds,
                                                      @Param("excludeBranchIds") List<Integer> branchIds,
                                                      @Param("fromMarketCap") Double fromMarketCap,
                                                      @Param("toMarketCap") Double toMarketCap,
                                                      Pageable pageable);

    @Query("select new ch.steve84.stock_analyzer.entity.quandl.NormalizedScore(max(ns.scoreId), ns.index, sum(case when ns.scoreType.scoreTypeId = 1 then (ns.scoreValue * :levermannFactor) when ns.scoreType.scoreTypeId = 2 then (ns.scoreValue * :magicFormulaFactor) else (ns.scoreValue * :piotroskiFactor) end)) "
         + "from NormalizedScore ns "
         + "where ns.index.country.countryId not in :excludeCountryIds "
         + "group by ns.index.indexId")
    List<NormalizedScore> getNormalizedScoresOfIndices(@Param("levermannFactor") Double levermannFactor,
                                                       @Param("magicFormulaFactor") Double magicFormulaFactor,
                                                       @Param("piotroskiFactor") Double piotroskiFactor,
                                                       @Param("excludeCountryIds") List<Integer> countryIds,
                                                       Pageable pageable);
}
