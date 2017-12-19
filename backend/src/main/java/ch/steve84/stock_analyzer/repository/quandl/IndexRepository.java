package ch.steve84.stock_analyzer.repository.quandl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import ch.steve84.stock_analyzer.entity.quandl.Index;

@RepositoryRestResource(collectionResourceRel = "index", path = "indices")
public interface IndexRepository extends ReadOnlyRepository<Index, Integer> {
	@PreAuthorize("hasAuthority('GPU')")
	@Query("select i from Index i, FullScore sc, ScoreType st where i.indexId = sc.indexId and sc.scoreTypeId = st.scoreTypeId and st.name = :name and i.publicIndex = TRUE order by sc.scoreValue nulls last")
	Page<Index> findByScoreTypeGPUAsc(@Param("name") String name, Pageable pageable);

	@PreAuthorize("hasAuthority('GPU')")
	@Query("select i from Index i, FullScore sc, ScoreType st where i.indexId = sc.indexId and sc.scoreTypeId = st.scoreTypeId and st.name = :name and i.publicIndex = TRUE order by sc.scoreValue desc nulls last")
	Page<Index> findByScoreTypeGPUDesc(@Param("name") String name, Pageable pageable);
	
	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select i from Index i, FullScore sc, ScoreType st where i.indexId = sc.indexId and sc.scoreTypeId = st.scoreTypeId and st.name = :name order by sc.scoreValue nulls last")
	Page<Index> findByScoreTypeAsc(@Param("name") String name, Pageable pageable);

	@PreAuthorize("hasAnyAuthority('Admin', 'Abo')")
	@Query("select i from Index i, FullScore sc, ScoreType st where i.indexId = sc.indexId and sc.scoreTypeId = st.scoreTypeId and st.name = :name order by sc.scoreValue desc nulls last")
	Page<Index> findByScoreTypeDesc(@Param("name") String name, Pageable pageable);
}
