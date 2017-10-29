package ch.steve84.stock_analyzer.repository.quandl;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

@NoRepositoryBean
public interface ReadOnlyRepository <T, ID extends Serializable> extends Repository<T, ID> {
    T findOne(ID id);
    Iterable<T> findAll(Iterable<ID> ids);
    Iterable<T> findAll();
    Iterable<T> findAll(Sort sort);
    Page<T> findAll(Pageable pageable);
}
