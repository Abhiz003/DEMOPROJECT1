package com.cdac.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.UserBlog;
import com.cdac.repository.BlogsRepo;



@RestController
@CrossOrigin("http://localhost:3003")
@RequestMapping("/blogs")
public class UserBlogController {
	private BlogsRepo blogRepo;
	
	public UserBlogController(BlogsRepo blogRepo) {
        this.blogRepo = blogRepo;
    }
	
	@PostMapping("/addBlog")
	UserBlog userBlog(@RequestBody UserBlog userBlog) {
		
		return blogRepo.save(userBlog);
	}
	
	 @GetMapping("/getBlogs")
	    List<UserBlog> getAllBlogs() {
	        return blogRepo.findAll();
	    }
}
