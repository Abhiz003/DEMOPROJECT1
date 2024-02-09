package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.UserBlog;

public interface BlogsRepo extends JpaRepository<UserBlog,  Long> {


}
