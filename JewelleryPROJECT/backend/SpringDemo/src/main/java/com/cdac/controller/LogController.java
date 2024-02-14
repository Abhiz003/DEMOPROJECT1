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

import com.cdac.dto.LogDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Blog;
import com.cdac.entity.Log;
import com.cdac.exception.BloggerServiceException;
import com.cdac.service.BlogService;
import com.cdac.service.LogService;

@RestController
@CrossOrigin
public class LogController {
	
	@Autowired
	private LogService logService;
	
	@Autowired
	private BlogService blogService;
	
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
	
	
	@PostMapping("/add-log")
	public ResponseEntity<RegistrationStatus> registerLog(
	    @RequestParam("blogId") int blogId,
	    @ModelAttribute LogDetail logDetail
	) {
	    try {
	        Log log = new Log();
	        Blog blog = blogService.fetchById(blogId);
	        log.setBlog(blog);
	        
	        // set the fields of the entity using dto
	        log.setPlaceName(logDetail.getPlaceName());
	        log.setStartTime(logDetail.getStartTime());
	        log.setExitTime(logDetail.getExitTime());
	        log.setLogDescription(logDetail.getLogDescription());
	        log.setPassAmount(logDetail.getPassAmount());
	        log.setLocation(logDetail.getLocation());
	        
	        
	        MultipartFile logPic = logDetail.getImageUrl();

	        // Check if Pic is not null before accessing properties
	        if (logPic != null) {
	            try {
	                String fileName = logPic.getOriginalFilename();

	                String generatedFileName = fileName;

	                log.setImageUrl(generatedFileName);

	                InputStream is = logPic.getInputStream();
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
	       
	        Log addedLog = logService.addLog(log);
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(true);
	        status.setStatusMessage("Photo Uploaded Successful!");
	        status.setId(addedLog.getLogId());    //-------- something wrong
	        return new ResponseEntity<>(status, HttpStatus.OK);

	    } catch (BloggerServiceException e) {      //-----------catch universal exception or simply show any message
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage(e.getMessage());

	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}

	
	
	
	
	
	
	
	 @GetMapping("/blog/log/{logId}")
   public Log fetchByLogId(@PathVariable int logId) {
       Log log = logService.fetchByLogId(logId);
       //-------surround with try catch ---------------------
       if (log == null) {
           throw new BloggerServiceException("Blog with id " + logId + " does not exist!");
       }
       return log;
       //---------------------------
   }

	 
	
	 
	 
	 //--------------------fetch image of A Log-----------------
	 
   @GetMapping(path = "/blog/fetch/logPic/{logId}", produces = MediaType.IMAGE_JPEG_VALUE)
   public ResponseEntity<byte[]> getLogPic(@PathVariable int logId) {
       try {
           Log log = logService.fetchByLogId(logId);
           //--------------surround with try catch-------------------------------
           if (log == null) {
               throw new BloggerServiceException("Blog with id " + logId + " does not exist!");
           }
          //--------------------------------------
           
           
           Path imagePath = FileSystems.getDefault().getPath("C:\\ReactSpringbootApp\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES", log.getImageUrl());
           byte[] imageBytes = Files.readAllBytes(imagePath);

           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.IMAGE_JPEG);

           return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
       } catch (IOException e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
   }

	 
	 
//	 @GetMapping(path = "/blogger/fetch/pic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
//	 public ResponseEntity<byte[]> getProfilePic(@PathVariable int id) {
//	     try {
//	         Blog blog = blogService.fetchById(id);
//	         if (blog == null) {
//	             throw new BloggerServiceException("Blog with id " + id + " does not exist!");
//	         }
//
//	         // Assuming blog.getPhotoUrl() contains the correct image filename
//	         Path imagePath = Paths.get("C:\\ReactSpringbootApp\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES", blog.getPhotoUrl());
//	         byte[] imageBytes = Files.readAllBytes(imagePath);
//
//	         HttpHeaders headers = new HttpHeaders();
//	         headers.setContentType(MediaType.IMAGE_JPEG);
//
//	         return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
//	     } catch (IOException e) {
//	         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	     }
//	 }

	 
	 
	 
	 
   //-----------XXXXXXXX-----------------changes made here--------------------------------XXXXXXXXXX---------------changes made here ---------
	 
//   @GetMapping("/blog/fetchLogs/{blogId}")
//   public RegistrationStatus fetchLogsByBlogId(@PathVariable String blogId) {
//       try {
//           List<Log> logList = logService.fetchLogsByBlogId(Integer.parseInt(blogId));
//
//           RegistrationStatus status = new RegistrationStatus();
//           status.setList(logList);
//           status.setStatus(true);
//           status.setStatusMessage("Blog photos fetched successfully.");
//           return status;
//       } catch (Exception e) {
//           RegistrationStatus status = new RegistrationStatus();
//           status.setStatus(false);
//           status.setStatusMessage("Failed to fetch blog photos: " + e.getMessage());
//           return status;
//       }
//   }
//--------------xxxxxxxxxxxxxxxxxx ----------------xxxxxxxxxxxxxxxx-------------xxxxxxxxxxx--------xxxxxxxxxxxxxxxx 
   
   
   
   
   
   
   
   //-------------------Fetch Blog API --------------------------------------------
   
//   @GetMapping("/blog/get-my-blogs/{bloggerId}")
//   public RegistrationStatus fetchBlogsByUserId(@PathVariable String bloggerId) {
//      try {
//    	  
//    	  System.out.println(bloggerId);
//          List<Blog> blogList = blogService.fetchBlogsByBloggerId(Integer.parseInt(bloggerId));
//
//          System.out.println(blogList);
//          RegistrationStatus status = new RegistrationStatus();
//          status.setList(blogList);
//          status.setStatus(true);
//          status.setStatusMessage("User's blogs fetched successfully.");
//          return status;
//      } catch (Exception e) {
//          RegistrationStatus status = new RegistrationStatus();
//          status.setStatus(false);
//          status.setStatusMessage("Failed to fetch user's blogs: " + e.getMessage());
//          return status;
//      }
//   }
   
   
   
   @GetMapping("/log/get-logs/{blogId}")
   public List<Log> fetchLogsByBlogId(@PathVariable String blogId) {      // -----------doubt here
      try {
    	  
    	  System.out.println(blogId);
          List<Log> logList = logService.fetchLogsByBlogId(Integer.parseInt(blogId));
          return logList;
      } catch (Exception e) {
    	  throw new RuntimeException("Failed to fetch logs of the Blog: " + e.getMessage());
      }
   }   
   
   
   
   
   
   
   
   
   
   
   
   @GetMapping("/log/fetchAllLogs")
   public RegistrationStatus fetchAllLogs() {
       try {
           List<Log> logList = logService.fetchAllLogs();

           RegistrationStatus status = new RegistrationStatus();
           status.setList(logList);
           status.setStatus(true);
           status.setStatusMessage("All logs fetched successfully.");
           return status;
       } catch (Exception e) {
           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(false);
           status.setStatusMessage("Failed to fetch all logs of your blog: " + e.getMessage());
           return status;
       }
   }

  
   
   @DeleteMapping("/log/delete/{logId}")
   public ResponseEntity<RegistrationStatus> deleteLog(@PathVariable int logId) {
       try {
           Log log = logService.fetchByLogId(logId);
           
           if (log == null) {
               throw new BloggerServiceException("Log with logId = " + logId + " does not exist!");
           }
           

           Path imagePath = FileSystems.getDefault().getPath("C:\\ReactSpringbootApp\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES", log.getImageUrl());
           Files.deleteIfExists(imagePath);

           logService.deleteImage(log);

           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(true);
           status.setStatusMessage("Log deleted successfully.");
           return ResponseEntity.ok(status);
       } catch (Exception e) {
           RegistrationStatus status = new RegistrationStatus();
           status.setStatus(false);
           status.setStatusMessage("Failed to delete log: " + e.getMessage());
           return ResponseEntity.badRequest().body(status);
       }
   }


}
