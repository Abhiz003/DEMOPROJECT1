package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Blog;
import com.cdac.entity.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Integer>{

	@Query("SELECT l FROM Log l WHERE l.blog.id = :blogId")
    List<Log> findByBlogId(@Param("blogId") int blogId);
}
