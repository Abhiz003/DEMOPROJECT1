package com.cdac.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.BlogDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Blog;
import com.cdac.entity.Blogger;
import com.cdac.exception.BloggerServiceException;
import com.cdac.service.BlogService;
import com.cdac.service.BloggerService;

@RestController
@CrossOrigin
public class BlogController {
	
	@Autowired
	private BlogService blogService;
	
	@Autowired
	private BloggerService bloggerService;
	
//	@PostMapping("/add-blog")
//	public ResponseEntity<RegistrationStatus> registerBlog(    @ModelAttribute BlogDetail blogDetail) {
//	    try {
//	        Blog blog = new Blog();
//	        Blogger blogger = bloggerService.fetchById(blogDetail.getBloggerId());
//	        blog.setBlogger(blogger);
//	        blog.setTitle(blogDetail.getTitle());
//	        blog.setStartDate(blogDetail.getStartDate());
//	        blog.setEndDate(blogDetail.getEndDate());
//	        blog.setBlogDescription(blogDetail.getBlogDescription());
//	        blog.setMembers(blogDetail.getMembers());
//	        blog.setTotalCost(blogDetail.getTotalCost());
//	        blog.setTransportationMode(blogDetail.getTransportationMode());
//	       
//	        
//	        MultipartFile pic = blogDetail.getPhotoUrl();
//	        
//	        // Check is Pic is not null before accessing properties
//	        if (pic != null) {
//	            try {
//	                String fileName = pic.getOriginalFilename();
//
//	                String generatedFileName = fileName; 
//
//	                blog.setPhotoUrl(generatedFileName);
//
//	                InputStream is = pic.getInputStream();
//	                FileOutputStream os = new FileOutputStream("C:" + File.separator + "ReactSpringbootApp" + File.separator +  "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + generatedFileName);
//	                FileCopyUtils.copy(is, os);
//	            } catch (IOException e) {
//	                e.printStackTrace();
//	            }
//	        } else {
//	            RegistrationStatus status = new RegistrationStatus();
//	            status.setStatus(false);
//	            status.setStatusMessage("picture is required.");
//	            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
//	        }
//
//	        Blog addedBlog = blogService.addBlog(blog);
//	        RegistrationStatus status = new RegistrationStatus();
//	        status.setStatus(true);
//	        status.setStatusMessage("Photo Uploaded Successful!");
//	        status.setId(addedBlog.getId());
//
//	        return new ResponseEntity<>(status, HttpStatus.OK);
//
//	    } catch (BloggerServiceException e) {
//	        RegistrationStatus status = new RegistrationStatus();
//	        status.setStatus(false);
//	        status.setStatusMessage(e.getMessage());
//
//	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
//	    }
//	}
	
	
	@PostMapping("/add-blog")
	public ResponseEntity<RegistrationStatus> registerBlog(
	    @RequestParam("bloggerId") int bloggerId,
	    @ModelAttribute BlogDetail blogDetail
	) {
	    try {
	        Blog blog = new Blog();
	        Blogger blogger = bloggerService.fetchById(bloggerId);
	        blog.setBlogger(blogger);
	        blog.setTitle(blogDetail.getTitle());
	        blog.setStartDate(blogDetail.getStartDate());
	        blog.setEndDate(blogDetail.getEndDate());
	        blog.setBlogDescription(blogDetail.getBlogDescription());
	        blog.setMembers(blogDetail.getMembers());
	        blog.setTotalCost(blogDetail.getTotalCost());
	        blog.setTransportationMode(blogDetail.getTransportationMode());

	        MultipartFile pic = blogDetail.getPhotoUrl();

	        // Check if Pic is not null before accessing properties
	        if (pic != null) {
	            try {
	                String fileName = pic.getOriginalFilename();

	                String generatedFileName = fileName;

	                blog.setPhotoUrl(generatedFileName);

	                InputStream is = pic.getInputStream();
	                FileOutputStream os = new FileOutputStream("C:" + File.separator + "ReactSpringbootApp"+ File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + generatedFileName);
	                FileCopyUtils.copy(is, os);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        } else {
	            RegistrationStatus status = new RegistrationStatus();
	            status.setStatus(false);
	            status.setStatusMessage("Picture is required.");
	            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	        }

	        Blog addedBlog = blogService.addBlog(blog);
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(true);
	        status.setStatusMessage("Photo Uploaded Successful!");
	        status.setId(addedBlog.getId());

	        return new ResponseEntity<>(status, HttpStatus.OK);

	    } catch (BloggerServiceException e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage(e.getMessage());

	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}

	
	
	
	
	
	
	
	
	 @GetMapping("/blogger/blog/{id}")
   public Blog fetchById(@PathVariable int id) {
       Blog blog = blogService.fetchById(id);
       if (blog == null) {
           throw new BloggerServiceException("Blog with id " + id + " does not exist!");
       }
       return blog;
   }

   @GetMapping(path = "/blogger/fetch/pic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
   public ResponseEntity<byte[]> getProfilePic(@PathVariable int id) {
       try {
           Blog blog = blogService.fetchById(id);
           if (blog == null) {
               throw new BloggerServiceException("Blog with id " + id + " does not exist!");
           }

           Path imagePath = FileSystems.getDefault().getPath("C:\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES", blog.getPhotoUrl());
           byte[] imageBytes = Files.readAllBytes(imagePath);

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.IMAGE_JPEG);

           return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
       } catch (IOException e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
   }

   @GetMapping("/blog/fetchBlogsByBloggerId/{bloggerId}")
   public RegistrationStatus fetchBlogsByBloggerId(@PathVariable String bloggerId) {
       try {
           List<Blog> blogList = blogService.fetchBlogsByBloggerId(Integer.parseInt(bloggerId));

           RegistrationStatus status = new RegistrationStatus();
           status.setList(blogList);
           status.setStatus(true);
           status.setStatusMessage("Blog photos fetched successfully.");
           return status;
       } catch (Exception e) {
           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(false);
           status.setStatusMessage("Failed to fetch blog photos: " + e.getMessage());
           return status;
       }
   }

   
   @GetMapping("/blog/get-my-blogs/{bloggerId}")
   public RegistrationStatus fetchBlogsByUserId(@PathVariable String bloggerId) {
      try {
    	  
    	  System.out.println(bloggerId);
          List<Blog> blogList = blogService.fetchBlogsByBloggerId(Integer.parseInt(bloggerId));

          System.out.println(blogList);
          RegistrationStatus status = new RegistrationStatus();
          status.setList(blogList);
          status.setStatus(true);
          status.setStatusMessage("User's blogs fetched successfully.");
          return status;
      } catch (Exception e) {
          RegistrationStatus status = new RegistrationStatus();
          status.setStatus(false);
          status.setStatusMessage("Failed to fetch user's blogs: " + e.getMessage());
          return status;
      }
   }
   
   
   @GetMapping("/blog/fetchAllBlogs")
   public RegistrationStatus fetchAllBlogs() {
       try {
           List<Blog> blogList = blogService.fetchAllBlogs();

           RegistrationStatus status = new RegistrationStatus();
           status.setList(blogList);
           status.setStatus(true);
           status.setStatusMessage("All blogs fetched successfully.");
           return status;
       } catch (Exception e) {
           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(false);
           status.setStatusMessage("Failed to fetch all blogs: " + e.getMessage());
           return status;
       }
   }

   @DeleteMapping("/blog/delete/{id}")
   public ResponseEntity<RegistrationStatus> deleteBlog(@PathVariable int id) {
       try {
           Blog blog = blogService.fetchById(id);
           if (blog == null) {
               throw new BloggerServiceException("Blog with id " + id + " does not exist!");
           }

           Path imagePath = FileSystems.getDefault().getPath("C:\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES", blog.getPhotoUrl());
           Files.deleteIfExists(imagePath);

           blogService.deleteImage(blog);

           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(true);
           status.setStatusMessage("Blog deleted successfully.");
           return ResponseEntity.ok(status);
       } catch (Exception e) {
           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(false);
           status.setStatusMessage("Failed to delete blog: " + e.getMessage());
           return ResponseEntity.badRequest().body(status);
       }
   }


}
