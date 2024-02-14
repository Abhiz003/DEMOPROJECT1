package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.entity.Blog;
import com.cdac.entity.Blogger;


@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
	
	
	@Query("SELECT b FROM Blog b WHERE b.blogger.bloggerId = :bloggerId")
    List<Blog> findByBloggerId(@Param("bloggerId") int bloggerId);
	
	
	@Transactional
	@Modifying
	@Query("INSERT INTO Blog (title, startDate, endDate, blogDescription, photoUrl, members, totalCost, transportationMode, blogger) " +
		   "VALUES (:title, :startDate, :endDate, :blogDescription, :photoUrl, :members, :totalCost, :transportationMode, :blogger)")
	void addBlogWithData(@Param("title") String title,
                         @Param("startDate") String startDate,
                         @Param("endDate") String endDate,
                         @Param("blogDescription") String blogDescription,
                         @Param("photoUrl") String photoUrl,
                         @Param("members") int members,
                         @Param("totalCost") double totalCost,
                         @Param("transportationMode") String transportationMode,
                         @Param("blogger") Blogger blogger);
	
	
}