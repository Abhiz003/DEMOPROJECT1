package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Blogger;

public interface BloggerRepository extends JpaRepository<Blogger, Integer>{
	public Optional<Blogger> findByBloggerEmail(String bloggerEmail);
}
