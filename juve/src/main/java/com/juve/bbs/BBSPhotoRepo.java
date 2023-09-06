package com.juve.bbs;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BBSPhotoRepo extends CrudRepository<BBSPhoto, String> {

	public abstract List<BBSPhoto> findByBbsNo(Integer bbsNo);

}
