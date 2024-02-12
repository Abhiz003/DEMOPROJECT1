package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer>{

	List<Blog> findByBlogger_BloggerId(int bloggerId);
	
}
