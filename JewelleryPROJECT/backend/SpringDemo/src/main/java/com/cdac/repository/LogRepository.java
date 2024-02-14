package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.entity.Blog;
import com.cdac.entity.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Integer>{

	@Query("SELECT l FROM Log l WHERE l.blog.id = :blogId")
    List<Log> findByBlogId(@Param("blogId") int blogId);
	
	
	
	@Transactional
	@Modifying
	@Query("INSERT INTO Log (placeName, startTime, exitTime, imageUrl, logDescription, passAmount, location, blog) " +
	       "VALUES (:placeName, :startTime, :exitTime, :imageUrl, :logDescription, :passAmount, :location, :blog)")
	void addLogWithData(@Param("placeName") String placeName,
	                    @Param("startTime") String startTime,
	                    @Param("exitTime") String exitTime,
	                    @Param("imageUrl") String imageUrl,
	                    @Param("logDescription") String logDescription,
	                    @Param("passAmount") String passAmount,
	                    @Param("location") String location,
	                    @Param("blog") Blog blog);

	
}
