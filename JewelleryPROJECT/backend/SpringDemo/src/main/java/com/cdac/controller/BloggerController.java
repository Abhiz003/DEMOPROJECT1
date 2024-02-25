package com.cdac.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.BloggerDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Blogger;
import com.cdac.exception.BloggerServiceException;
import com.cdac.service.BloggerService;

@RestController
public class BloggerController {
	
	@Autowired
	private BloggerService bloggerService;
	
	public  static String  imgPath = "C:" + File.separator + "ReactSpringbootApp"  + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "safar-react-frontend" + File.separator + "public"  + File.separator + "Images";
	
	
	

	/**
	 * --------------------- Create  New Blogger -------------------- 
	 * 
	 * @param bloggerDetails
	 * @return
	 */
	@PostMapping("/register-blogger")
    public ResponseEntity<RegistrationStatus> registerBlogger(BloggerDetail bloggerDetails) {
        try {
            Blogger blogger = new Blogger();
            BeanUtils.copyProperties(bloggerDetails, blogger);

            MultipartFile profilePic = bloggerDetails.getProfilePic();

            // Check if profilePic is not null before accessing properties
            if (profilePic != null) {
                try {
                  
                    String generatedFileName = profilePic.getOriginalFilename(); // replace this later

                    blogger.setProfilePic(generatedFileName);

                    InputStream is = profilePic.getInputStream();
                    FileOutputStream os = new FileOutputStream(imgPath  +  File.separator + "Profiles"  + File.separator + generatedFileName);
                    FileCopyUtils.copy(is, os);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                // Handle the case where profilePic is null
                RegistrationStatus status = new RegistrationStatus();
                status.setStatus(false);
                status.setStatusMessage("Profile picture is required.");
                return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
            }

            int id = bloggerService.register(blogger);
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("Registration successful!");
            status.setId(id);

//            System.out.println("status is " + status.getStatus());
            
            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (BloggerServiceException e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

	
	

	/**
	 * ----------------Blogger Login API-----------------
	 * 
	 * 
	 * @param blogger
	 * @return
	 */
	@PostMapping("/login-blogger")
	public RegistrationStatus isBloggerPresent(@RequestBody Blogger blogger){
		try {
			Blogger newBlogger = bloggerService.login(blogger);
			
//			 String token = "bloggerToken123";    // this is  my key 
//			 newBlogger.setToken(token);     // move it under object and check if needed in the entity  and setter method for it
			
			
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(true);
			status.setStatusMessage("Login Successfull");
			status.setEmail(newBlogger.getBloggerEmail());
			status.setName(newBlogger.getBloggerName());
//			status.setToken(token);
			status.setId(newBlogger.getBloggerId());
			return status;
		} catch (Exception e) {
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			return status;
		}
	}
	
	

	/**
	 *-------------------Update Blogger API------------
	 * 
	 * @param bloggerDetails
	 * @return
	 */
	@PostMapping("/update-blogger")
	public ResponseEntity<RegistrationStatus> updateBlogger(@ModelAttribute BloggerDetail bloggerDetails) {
	    try {
	        Blogger existingBlogger = bloggerService.fetchById(bloggerDetails.getBloggerId());

	        if (existingBlogger == null) {
	            // Handle case where the blogger is not found
	            RegistrationStatus notFoundStatus = new RegistrationStatus();
	            notFoundStatus.setStatus(false);
	            notFoundStatus.setStatusMessage("Blogger not found");
	            return new ResponseEntity<>(notFoundStatus, HttpStatus.NOT_FOUND);
	        }

	        // Copy non-null properties from bloggerDetails to existingBlogger
	        BeanUtils.copyProperties(bloggerDetails, existingBlogger, getNullPropertyNames(bloggerDetails));

	        // Update profile picture if provided
	        MultipartFile profilePic = bloggerDetails.getProfilePic();
	        if (profilePic != null && !profilePic.isEmpty()) {
	            String fileName = profilePic.getOriginalFilename();
	            String generatedFileName = fileName;

	            existingBlogger.setProfilePic(generatedFileName);

	            try (InputStream is = profilePic.getInputStream();
	                 FileOutputStream os = new FileOutputStream(imgPath + File.separator + "Profiles" + File.separator + generatedFileName)) {
	                FileCopyUtils.copy(is, os);
	            } catch (IOException e) {
	                // Handle IO exception
	                e.printStackTrace();
	            }
	        }

	        int id = bloggerService.update(existingBlogger);
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(true);
	        status.setStatusMessage("Blogger Updated Successfully!");
	        status.setId(id);

	        return new ResponseEntity<>(status, HttpStatus.OK);
	    } catch (BloggerServiceException e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage(e.getMessage());
	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}

	// Helper method to get property names with null values
	private String[] getNullPropertyNames(Object source) {
	    final BeanWrapper src = new BeanWrapperImpl(source);
	    java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

	    Set<String> emptyNames = new HashSet<>();
	    for (java.beans.PropertyDescriptor pd : pds) {
	        Object srcValue = src.getPropertyValue(pd.getName());
	        if (srcValue == null) emptyNames.add(pd.getName());
	    }

	    String[] result = new String[emptyNames.size()];
	    return emptyNames.toArray(result);
	}
	
	
	/**
	 * -------------------Get-Bloggers API---------------
	 * 
	 * @return
	 */
	@GetMapping("/get-bloggers")
	public ResponseEntity<RegistrationStatus> getAllBloggers() {
	    try {
	        List<Blogger> bloggers = bloggerService.getAllBloggers();

	        RegistrationStatus status = new RegistrationStatus();
	        status.setList(bloggers);
	        status.setStatus(true);
	        status.setStatusMessage("All bloggers fetched successfully.");

	        return new ResponseEntity<>(status, HttpStatus.OK);
	    } catch (BloggerServiceException e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage("Failed to fetch all bloggers: " + e.getMessage());

	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}
	
	
	/**
	 * --------------------- Fetch One Blogger using ID ---------------
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/blogger/fetch/{id}")
	public Blogger fetchById(@PathVariable int id) {
		return bloggerService.fetchById(id);
	}
	
	
	/**
	 * --------------------Fetch profilePic of A blogger-------------
	 * 
	 * @param bloggerId
	 * @return
	 * @throws IOException
	 */
	@GetMapping(path = "/blogger/fetch/profilePic/{bloggerId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getProfilePic(@PathVariable int bloggerId) throws IOException {
        Blogger blogger = bloggerService.fetchById(bloggerId);
        return Files.readAllBytes(Paths.get(imgPath + "Profiles" + File.separator + blogger.getProfilePic()));
    }




/**
 * ---------------Delete Blogger   API-------------------
 * 
 * @param id
 * @return
 */
	@DeleteMapping("/delete-blogger/{id}")
	public ResponseEntity<?> deleteBlogger(@PathVariable int id) {
	    try {
	        Blogger fetchedBlogger = bloggerService.fetchById(id);
	        if (fetchedBlogger != null) {
	            bloggerService.permanentlyDelete(fetchedBlogger);
	            return ResponseEntity.ok("Blogger with ID: " + fetchedBlogger.getBloggerId() + "Permanently deleted successfully");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (BloggerServiceException e) {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
	    }
	}




}