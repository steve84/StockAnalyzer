package ch.steve84.stock_analyzer.repository.quandl;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ch.steve84.stock_analyzer.entity.quandl.User;

@RepositoryRestResource(collectionResourceRel = "signal", path = "signals")
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
	User findByUsername(@Param("username") String username); 
}
