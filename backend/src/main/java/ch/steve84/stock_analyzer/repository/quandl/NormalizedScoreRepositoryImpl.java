package ch.steve84.stock_analyzer.repository.quandl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import ch.steve84.stock_analyzer.entity.quandl.NormalizedScore;
import ch.steve84.stock_analyzer.entity.quandl.Stock;
import ch.steve84.stock_analyzer.enums.Roles;

public class NormalizedScoreRepositoryImpl implements ReadOnlyRepository<NormalizedScore, Integer> {

    @PersistenceContext
    private EntityManager em;
	
	@Override
	public NormalizedScore findOne(Integer id) {
        if (hasAccess()) {
        	Query q = em.createNamedQuery("NormalizedScore.findById");
        	q.setParameter("id", id);
        	try {
        		return (NormalizedScore)q.getSingleResult();
        	} catch (NoResultException e) {
        		return null;
        	}
        } else {
        	Query q = em.createNamedQuery("NormalizedScore.findByIdPublic");
        	q.setParameter("id", id);
        	try {
        		return (NormalizedScore)q.getSingleResult();
        	} catch (NoResultException e) {
        		return null;
        	}
        }
	}

	@Override
	public Iterable<NormalizedScore> findAll() {
		return null;
	}

	@Override
	public Iterable<NormalizedScore> findAll(Iterable<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Iterable<NormalizedScore> findAll(Sort sort) {
		return null;
	}

	@Override
	public Page<NormalizedScore> findAll(Pageable pageable) {
        if (hasAccess()) {
        	Query q = em.createNamedQuery("NormalizedScore.countAllNormalizedScores");
        	Long totalRecords = (Long)q.getSingleResult();
        	
        	q = em.createNamedQuery("NormalizedScore.findAllNormalizedScores");
        	q.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        	q.setMaxResults(pageable.getPageSize());
        	try {
        		List<NormalizedScore> res = q.getResultList();
        		Page<NormalizedScore> p = new PageImpl<NormalizedScore>(res, pageable, totalRecords);
        		return p;
        	} catch (NoResultException e) {
        		return null;
        	}
        } else {
        	Query q = em.createNamedQuery("NormalizedScore.countAllPublicNormalizedScores");
        	Long totalRecords = (Long)q.getSingleResult();
        	
        	q = em.createNamedQuery("NormalizedScore.findAllPublicNormalizedScores");
        	q.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        	q.setMaxResults(pageable.getPageSize());
        	try {
        		List<NormalizedScore> res = q.getResultList();
        		Page<NormalizedScore> p = new PageImpl<NormalizedScore>(res, pageable, totalRecords);
        		return p;
        	} catch (NoResultException e) {
        		return null;
        	}
        }
	}

    private boolean hasAccess() {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	if (auth != null) {
    		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(auth.getAuthorities());
    		return authorities.size() > 0 && (authorities.get(0).getAuthority().equals(Roles.ADMIN.getRole().getRoleName()) || authorities.get(0).getAuthority().equals(Roles.ABO.getRole().getRoleName()));
    	}
    	return false;
    }
}
