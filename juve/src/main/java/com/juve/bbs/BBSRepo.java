package com.juve.bbs;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BBSRepo extends CrudRepository<BBS, Integer> {
	public abstract List<BBS> findAll();

	public abstract Page<BBS> findByTypeAndTitleContaining(String type, String title, Pageable p);
	
	@Transactional
	@Modifying
	@Query("UPDATE JUVE_BBS b SET b.hits = b.hits + 1 WHERE b.no = :no")
	void addHits(@Param("no") Integer no);
}
