package com.cdac.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.BloggerDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Blogger;
import com.cdac.entity.Blogger.BloggerStatus;
import com.cdac.exception.BloggerServiceException;
import com.cdac.service.BloggerService;

@RestController
@CrossOrigin
public class BloggerController {
	
	@Autowired
	private BloggerService bloggerService;
	
	@PostMapping("/register-blogger")
    public ResponseEntity<RegistrationStatus> registerBlogger(BloggerDetail bloggerDetails) {
        try {
            Blogger blogger = new Blogger();
            BeanUtils.copyProperties(bloggerDetails, blogger);

            MultipartFile profilePic = bloggerDetails.getProfilePic();

            // Check if profilePic is not null before accessing properties
            if (profilePic != null) {
                try {
                    String fileName = profilePic.getOriginalFilename();
                    // TODO: here should be the code to generate a unique name for the file before proceeding further
                    String generatedFileName = fileName; // replace this later

                    blogger.setProfilePic(generatedFileName);

                    InputStream is = profilePic.getInputStream();
                    FileOutputStream os = new FileOutputStream("C:" + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + "BloggerProfiles"  + File.separator + generatedFileName);
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

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (BloggerServiceException e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

	
	@PostMapping("/login-blogger")
	public RegistrationStatus isBloggerPresent(@RequestBody Blogger blogger){
		try {
			Blogger newBlogger = bloggerService.login(blogger);
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(true);
			status.setStatusMessage("Login Successfull");
			status.setEmail(newBlogger.getBloggerEmail());
			status.setName(newBlogger.getBloggerName());
			status.setId(newBlogger.getBloggerId());
			return status;
		} catch (Exception e) {
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			return status;
		}
	}
	
	@PostMapping("/blogger-update")
	public ResponseEntity<RegistrationStatus> update(BloggerDetail bloggerDetails) {
		try {
			Blogger blogger = new Blogger();
			BeanUtils.copyProperties(bloggerDetails, blogger);

			try {
				String fileName = bloggerDetails.getProfilePic().getOriginalFilename();
				String generatedFileName = fileName; 
				
				blogger.setProfilePic(generatedFileName);
				
				InputStream is = bloggerDetails.getProfilePic().getInputStream();
				FileOutputStream os = new FileOutputStream("C:" + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + "BloggerProfiles"  + File.separator + generatedFileName);
				FileCopyUtils.copy(is, os);
			}
			catch (IOException e) {
				
			}
			
			int id = bloggerService.update(blogger);
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(true);
			status.setStatusMessage("Blogger Updated Successful!");
			status.setId(id);
			
			return new ResponseEntity<RegistrationStatus>(status, HttpStatus.OK);
				
		}
		catch(BloggerServiceException e) {
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			
			return new ResponseEntity<RegistrationStatus>(status, HttpStatus.BAD_REQUEST);
		}
	}

	
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
	@GetMapping("/all-bloggers")
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
	
	@GetMapping("/blogger/fetch/{id}")
	public Blogger fetchById(@PathVariable int id) {
		return bloggerService.fetchById(id);
	}
	
	@GetMapping(path = "/blogger/fetch/profilePic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getProfilePic(@PathVariable int id) throws IOException {
        Blogger blogger = bloggerService.fetchById(id);
        return Files.readAllBytes(Paths.get("C:" + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + "BloggerProfiles" + File.separator + blogger.getProfilePic()));
    }
}
