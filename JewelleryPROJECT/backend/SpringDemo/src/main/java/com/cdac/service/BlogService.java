package com.cdac.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.BlogDetail;
import com.cdac.entity.Blog;
import com.cdac.exception.BloggerServiceException;
import com.cdac.repository.BlogRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BlogService {
	@Autowired
	private BlogRepository blogRepository;
	
	public int addImages(Blog blog) {
	        Blog savedBlog = blogRepository.save(blog);
	        return savedBlog.getId();
	}
	
	public void deleteImage(Blog blog) {
		blogRepository.delete(blog);
	}
	
	public Blog addBlog(Blog blog) {
        return blogRepository.save(blog);
       
	}
	
	public void deleteBlog(Blog blog) {
		blogRepository.delete(blog);
	}
	
	public Blog fetchById(int id) {
		Optional<Blog> blog = blogRepository.findById(id);
		if(blog.isPresent())
			return blog.get();
		else
			throw new BloggerServiceException("Blog with id " + id + " does not exist!");
	}
	
	public List<Blog> fetchBlogsByBloggerId(int bloggerId) {
        return blogRepository.findByBloggerId(bloggerId);
    }
	
	
	
	public List<Blog> fetchAllBlogs() {
			return blogRepository.findAll();
		}
	
	
	
	
	
	
	
	
	
	//------------------- UPDATE BLOG SERVICE-------------
//	public void updateBlog(int blogId, BlogDetail updatedBlogDetail) {
//        Blog existingBlog = fetchById(blogId);
//
//        // Copy non-null properties from updateBlogRequest to existingBlog
//        BeanUtils.copyProperties(updatedBlogDetail, existingBlog, getNullPropertyNames(blogRequest));
//
//        
//        existingBlog.setTitle(updatedBlogDetail.getTitle());
//        existingBlog.setStartDate(updatedBlogDetail.getStartDate());
//        existingBlog.setEndDate(updatedBlogDetail.getEndDate());
//        existingBlog.setBlogDescription(updatedBlogDetail.getBlogDescription());
//        existingBlog.setPhotoUrl(updatedBlogDetail.getPhotoUrl());
//        existingBlog.setMembers(updatedBlogDetail.getMembers());
//        existingBlog.setTotalCost(updatedBlogDetail.getTotalCost());
//        existingBlog.setTransportationMode(updatedBlogDetail.getTransportationMode());
//        
//        blogRepository.save(existingBlog);
//    }
//
//    // Helper method to get null property names from an object
//    private String[] getNullPropertyNames(Object source) {
//        final BeanWrapper src = new BeanWrapperImpl(source);
//        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
//
//        Set<String> emptyNames = new HashSet<>();
//        for (java.beans.PropertyDescriptor pd : pds) {
//            Object srcValue = src.getPropertyValue(pd.getName());
//            if (srcValue == null) emptyNames.add(pd.getName());
//        }
//
//        String[] result = new String[emptyNames.size()];
//        return emptyNames.toArray(result);
//    }
//	
	
	
}
