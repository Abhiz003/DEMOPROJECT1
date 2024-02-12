package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Blogger;
import com.cdac.entity.Blogger.BloggerStatus;
import com.cdac.exception.BloggerServiceException;
import com.cdac.exception.UserServiceException;
import com.cdac.repository.BloggerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BloggerService {
	
	@Autowired
	private BloggerRepository bloggerRepository;
	
	public int register(Blogger blogger) {
	    Optional<Blogger> isBloggerAlreadyPresent = bloggerRepository.findByBloggerEmail(blogger.getBloggerEmail());
	    if (isBloggerAlreadyPresent.isEmpty()) {
	    	Blogger savedBlogger = bloggerRepository.save(blogger);
	        savedBlogger.setBloggerStatus(BloggerStatus.ACTIVE);
	        return savedBlogger.getBloggerId();
	    } else {
	        throw new BloggerServiceException("Oops! Looks like you've already claimed your spot in our exclusive club.");
	    }
	}

	public Blogger login(Blogger blogger) {
	    Optional<Blogger> isBloggerPresent = bloggerRepository.findByBloggerEmail(blogger.getBloggerEmail());
	    if (isBloggerPresent.isPresent()) {
	    	Blogger existingUser = isBloggerPresent.get();
	        if (blogger.getBloggerPassword().equals(existingUser.getBloggerPassword())) {
	        	if(existingUser.getBloggerStatus() == BloggerStatus.ACTIVE) {
		            return existingUser;
	        	}
	        	else {
	        		throw new UserServiceException("Your Account Status is Deactivated, To Activate Connect to the Admin");
	        	}
	        } else {
	            throw new BloggerServiceException("Uh-oh! The secret password didn't quite match. Please try again.");
	        }
	    } else {
	        throw new BloggerServiceException("Oops! We couldn't find anyone with that email. Double-check or join our community!");
	    }
	}

	public int update(Blogger blogger) {
	    Optional<Blogger> optionalBlogger = bloggerRepository.findById(blogger.getBloggerId());

	    if (optionalBlogger.isPresent()) {
	        
	    	Blogger existingBlogger = optionalBlogger.get();
	        existingBlogger.setBloggerName(blogger.getBloggerName());
	        existingBlogger.setBloggerEmail(blogger.getBloggerEmail());
	        existingBlogger.setBloggerPhone(blogger.getBloggerPhone());
	        existingBlogger.setBloggerPassword(blogger.getBloggerPassword());
	        existingBlogger.setProfilePic(blogger.getProfilePic());
	        
	        Blogger updatedArtist = bloggerRepository.save(existingBlogger);
	        
	        updatedArtist.setBloggerStatus(BloggerStatus.ACTIVE);
	        return updatedArtist.getBloggerId();
	    } else {
	        throw new BloggerServiceException("Blogger not found with ID: " + blogger.getBloggerId());
	    }
	}
	
	public void delete(Blogger blogger) {
		bloggerRepository.save(blogger);
	}
	
	public void reActive(Blogger blogger) {
		bloggerRepository.save(blogger);
	}
	
	public void permanentlyDelete(Blogger blogger) {
		bloggerRepository.delete(blogger);
	}

	public Blogger fetchById(int id) {
		Optional<Blogger> blogger = bloggerRepository.findById(id);
		if(blogger.isPresent())
			return blogger.get();
		else
			throw new BloggerServiceException("Blogger with id " + id + " does not exist!");
	}

	public List<Blogger> getAllBloggers() {
		return bloggerRepository.findAll();
	}
}