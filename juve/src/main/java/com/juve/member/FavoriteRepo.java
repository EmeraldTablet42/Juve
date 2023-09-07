package com.juve.member;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepo extends CrudRepository<Favorite, Integer> {

	public abstract List<Favorite> findByFavId(String id);

	public abstract Favorite findByFavIdAndProductCode(String id, String productCode);

	public abstract void deleteByFavIdAndProductCode(String id, String productCode);
}
