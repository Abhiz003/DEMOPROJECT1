package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Blog;


@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByBloggerId(int blogger);
}