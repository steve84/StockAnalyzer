package ch.steve84.stock_analyzer.repository.quandl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import ch.steve84.stock_analyzer.entity.quandl.Index;
import ch.steve84.stock_analyzer.enums.Roles;

public class IndexRepositoryImpl implements ReadOnlyRepository<Index, Integer> {

    @Autowired
    private IndexRepository indexRepository;
    private Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    @Override
    public Index findOne(Integer id) {
        Index index = this.indexRepository.findByIndexId(id);
        
        if (hasAccess(index))
            return index;
        else
            return null;
    }

    @Override
    public Iterable<Index> findAll() {
        return null;
    }

    @Override
    public Iterable<Index> findAll(Sort sort) {
    	return null;
    }

    @Override
    public Page<Index> findAll(Pageable pageable) {
        if (hasAccess())
            return this.indexRepository.findAll(pageable);
        else
            return this.indexRepository.findByPublicIndexTrue(pageable);
    }

    private boolean hasAccess(Index index) {
        return index.getPublicIndex() || hasAccess();
    }
    
    private boolean hasAccess() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(auth.getAuthorities());
        return authorities.size() > 0 && (authorities.get(0).getAuthority().equals(Roles.ADMIN.getRole().getRoleName()) || authorities.get(0).getAuthority().equals(Roles.ABO.getRole().getRoleName()));
    }

}
