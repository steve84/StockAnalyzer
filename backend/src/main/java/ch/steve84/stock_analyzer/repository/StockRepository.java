package ch.steve84.stock_analyzer.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.Branch;
import ch.steve84.stock_analyzer.entity.Country;
import ch.steve84.stock_analyzer.entity.Stock;

@RepositoryRestResource(collectionResourceRel = "stock", path = "stocks")
public interface StockRepository extends PagingAndSortingRepository<Stock, Integer> {
	Page<Stock> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueAsc(@Param("name") String name, Pageable pageable);
	Page<Stock> findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValueDesc(@Param("name") String name, Pageable pageable);
	List<Stock> findByIsinContainingIgnoreCaseOrNameContainingIgnoreCase(@Param("isin") String isin, @Param("name") String name, Pageable pageable);
	@Query("select distinct s.country from Stock s")
	List<Country> getAllCountries();
	@Query("select distinct s.branch from Stock s")
	List<Branch> getAllBranches();
	
	@Query("select distinct s from Stock s "
			+ "left join s.indices i where"
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null)")
	Page<Stock> searchStocks(@Param("name") String name,
							 @Param("isin") String isin,
							 @Param("nsin") String nsin,
							 @Param("wkn") String wkn,
							 @Param("countryIds") List<Integer> countryIds,
							 @Param("branchIds") List<Integer> branchIds,
							 @Param("indexIds") List<Integer> indexIds,
							 Pageable pageable);
}
