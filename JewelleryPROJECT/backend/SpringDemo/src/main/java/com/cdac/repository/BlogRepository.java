package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Blog;


@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
	
	
	@Query("SELECT b FROM Blog b WHERE b.blogger.bloggerId = :bloggerId")
    List<Blog> findByBloggerId(@Param("bloggerId") int bloggerId);
	
	
	
	
	
}