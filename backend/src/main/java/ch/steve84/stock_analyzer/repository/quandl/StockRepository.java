package ch.steve84.stock_analyzer.repository.quandl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import ch.steve84.stock_analyzer.entity.quandl.Branch;
import ch.steve84.stock_analyzer.entity.quandl.Country;
import ch.steve84.stock_analyzer.entity.quandl.Stock;

@RepositoryRestResource(collectionResourceRel = "stock", path = "stocks")
public interface StockRepository extends ReadOnlyRepository<Stock, Integer> {
	@PreAuthorize("hasAuthority('GPU')")
	@Query("select s from Stock s, FullScore sc, ScoreType st where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and st.name = :name and s.publicStock = TRUE order by sc.scoreValue nulls last")
	Page<Stock> findByScoreTypeGPUAsc(@Param("name") String name, Pageable pageable);

	@PreAuthorize("hasAuthority('GPU')")
	@Query("select s from Stock s, FullScore sc, ScoreType st where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and st.name = :name and s.publicStock = TRUE order by sc.scoreValue desc nulls last")
	Page<Stock> findByScoreTypeGPUDesc(@Param("name") String name, Pageable pageable);

	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select s from Stock s, FullScore sc, ScoreType st where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and st.name = :name order by sc.scoreValue nulls last")
	Page<Stock> findByScoreTypeAsc(@Param("name") String name, Pageable pageable);

	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select s from Stock s, FullScore sc, ScoreType st where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and st.name = :name order by sc.scoreValue desc nulls last")
	Page<Stock> findByScoreTypeDesc(@Param("name") String name, Pageable pageable);
	
	@PreAuthorize("hasAuthority('GPU')")
	@Query("select s from Stock s where (upper(s.name) like concat('%', upper(:name), '%') or upper(s.isin) like concat('%', upper(:isin), '%')) and s.publicStock = TRUE")
	List<Stock> findByIsinOrNameGPU(@Param("isin") String isin, @Param("name") String name, Pageable pageable);
	
	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select s from Stock s where upper(s.name) like concat('%', upper(:name), '%') or upper(s.isin) like concat('%', upper(:isin), '%')")
	List<Stock> findByIsinOrName(@Param("isin") String isin, @Param("name") String name, Pageable pageable);

	@Query("select distinct s.country from Stock s")
	List<Country> getAllCountries();
	@Query("select distinct s.branch from Stock s")
	List<Branch> getAllBranches();
	
	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select s from Stock s where s.stockId in "
			+ "(select distinct s.stockId from Stock s "
			+ "left join s.indices i where "
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(s.stockId in :stockIds or :stockIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null))")
	Page<Stock> searchStocks(@Param("name") String name,
							 @Param("isin") String isin,
							 @Param("nsin") String nsin,
							 @Param("wkn") String wkn,
							 @Param("countryIds") List<Integer> countryIds,
							 @Param("branchIds") List<Integer> branchIds,
							 @Param("stockIds") List<Integer> stockIds,
							 @Param("indexIds") List<Integer> indexIds,
							 Pageable pageable);

	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select s from Stock s, FullScore sc, ScoreType st "
			+ "where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and s.stockId in "
			+ "(select distinct s.stockId from Stock s "
			+ "left join s.indices i where "
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(s.stockId in :stockIds or :stockIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null)) and "
			+ "st.name = :scoretype "
			+ "order by sc.scoreValue nulls last")
	Page<Stock> searchStocksScoreTypeAsc(@Param("name") String name,
							 		  @Param("isin") String isin,
							 		  @Param("nsin") String nsin,
							 		  @Param("wkn") String wkn,
							 		  @Param("scoretype") String scoretype,
							 		  @Param("countryIds") List<Integer> countryIds,
							 		  @Param("branchIds") List<Integer> branchIds,
							 		  @Param("stockIds") List<Integer> stockIds,
							 		  @Param("indexIds") List<Integer> indexIds,
							 		  Pageable pageable);

	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select s from Stock s, FullScore sc, ScoreType st "
			+ "where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and s.stockId in "
			+ "(select distinct s.stockId from Stock s "
			+ "left join s.indices i where "
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null)) and "
			+ "(s.stockId in :stockIds or :stockIds is null) and "
			+ "st.name = :scoretype "
			+ "order by sc.scoreValue desc nulls last")
	Page<Stock> searchStocksScoreTypeDesc(@Param("name") String name,
							 		  @Param("isin") String isin,
							 		  @Param("nsin") String nsin,
							 		  @Param("wkn") String wkn,
							 		  @Param("scoretype") String scoretype,
							 		  @Param("countryIds") List<Integer> countryIds,
							 		  @Param("branchIds") List<Integer> branchIds,
							 		  @Param("stockIds") List<Integer> stockIds,
							 		  @Param("indexIds") List<Integer> indexIds,
							 		  Pageable pageable);

	@PreAuthorize("hasAuthority('GPU')")
	@Query("select s from Stock s where s.stockId in "
			+ "(select distinct s.stockId from Stock s "
			+ "left join s.indices i where"
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(s.stockId in :stockIds or :stockIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null) and "
			+ "s.publicStock = TRUE)")
	Page<Stock> searchStocksGPU(@Param("name") String name,
							 @Param("isin") String isin,
							 @Param("nsin") String nsin,
							 @Param("wkn") String wkn,
							 @Param("countryIds") List<Integer> countryIds,
							 @Param("branchIds") List<Integer> branchIds,
							 @Param("stockIds") List<Integer> stockIds,
							 @Param("indexIds") List<Integer> indexIds,
							 Pageable pageable);

	@PreAuthorize("hasAuthority('GPU')")
	@Query("select s from Stock s, FullScore sc, ScoreType st "
			+ "where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and s.stockId in "
			+ "(select distinct s.stockId from Stock s "
			+ "left join s.indices i where "
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(s.stockId in :stockIds or :stockIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null) and "
			+ "s.publicStock = TRUE) and "
			+ "st.name = :scoretype "
			+ "order by sc.scoreValue nulls last")
	Page<Stock> searchStocksGPUScoreTypeAsc(@Param("name") String name,
							 				@Param("isin") String isin,
						 					@Param("nsin") String nsin,
						 					@Param("wkn") String wkn,
						 					@Param("scoretype") String scoretype,
						 					@Param("countryIds") List<Integer> countryIds,
						 					@Param("branchIds") List<Integer> branchIds,
						 					@Param("stockIds") List<Integer> stockIds,
						 					@Param("indexIds") List<Integer> indexIds,
						 					Pageable pageable);

	@PreAuthorize("hasAuthority('GPU')")
	@Query("select s from Stock s, FullScore sc, ScoreType st "
			+ "where s.stockId = sc.stockId and sc.scoreTypeId = st.scoreTypeId and s.stockId in "
			+ "(select distinct s.stockId from Stock s "
			+ "left join s.indices i where "
			+ "(upper(s.name) like %:name% or :name is null) and "
			+ "(upper(s.isin) like %:isin% or :isin is null) and "
			+ "(upper(s.nsin) like %:nsin% or :nsin is null) and "
			+ "(upper(s.wkn) like %:wkn% or :wkn is null) and "
			+ "(s.country.countryId in :countryIds or :countryIds is null) and "
			+ "(s.branch.branchId in :branchIds or :branchIds is null) and "
			+ "(s.stockId in :stockIds or :stockIds is null) and "
			+ "(i.indexId in :indexIds or :indexIds is null) and "
			+ "s.publicStock = TRUE) and "
			+ "st.name = :scoretype "
			+ "order by sc.scoreValue desc nulls last")
	Page<Stock> searchStocksGPUScoreTypeDesc(@Param("name") String name,
							 				 @Param("isin") String isin,
							 				 @Param("nsin") String nsin,
							 				 @Param("wkn") String wkn,
											 @Param("scoretype") String scoretype,
											 @Param("countryIds") List<Integer> countryIds,
											 @Param("branchIds") List<Integer> branchIds,
											 @Param("stockIds") List<Integer> stockIds,
											 @Param("indexIds") List<Integer> indexIds,
											 Pageable pageable);
}
