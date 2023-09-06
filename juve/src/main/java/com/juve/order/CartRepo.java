package com.juve.order;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends CrudRepository<Cart, Integer> {

	public abstract List<Cart> findAll();

	@Query(nativeQuery = true, name = "CartMapping")
	public abstract List<Cart> findAllByCartId(@Param("id") String id);
}
