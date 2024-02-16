package com.cdac.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.RegistrationStatus;
import com.cdac.dto.UserDetail;
import com.cdac.entity.User;
import com.cdac.exception.UserServiceException;
import com.cdac.service.UserService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    
    //--------------------xxxxxxxxx------------add User API----------xxxxxxxxx------------
    @PostMapping("/register-user")
    public ResponseEntity<RegistrationStatus> registerv3(UserDetail userDetails) {
        try {
            User user = new User();
            BeanUtils.copyProperties(userDetails, user);

            try {
                String fileName = userDetails.getProfilePic().getOriginalFilename();
                String generatedFileName = fileName;

                user.setProfilePic(generatedFileName);

                // Update the path to your desired directory
                String uploadPath = "C:" +  File.separator + "ReactSpringbootApp"+ File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + "UserProfiles"  + File.separator + generatedFileName;

                InputStream is = userDetails.getProfilePic().getInputStream();
                FileOutputStream os = new FileOutputStream(uploadPath);
                FileCopyUtils.copy(is, os);
            } catch (IOException e) {
                e.printStackTrace();
            }

            int id = userService.register(user);
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("Registration successful!");
            status.setId(id);

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (UserServiceException e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    
    
    
    
    
//    @PostMapping("/register-user")
//    public ResponseEntity<RegistrationStatus> registerv3(@RequestParam("profilePic") MultipartFile profilePic,
//                                                        @RequestParam("userName") String userName,
//                                                        @RequestParam("userEmail") String userEmail,
//                                                        @RequestParam("userPhone") long userPhone,
//                                                        @RequestParam("userPassword") String userPassword) {
//        try {
//            User user = new User();
//            user.setUserName(userName);
//            user.setUserEmail(userEmail);
//            user.setUserPhone(userPhone);
//            user.setUserPassword(userPassword);
//
//            try {
//                String fileName = profilePic.getOriginalFilename();
//                String generatedFileName = fileName;
//
//                user.setProfilePic(generatedFileName);
//
//                // Update the path to your desired directory
//                String uploadPath = "C:\\ReactSpringbootApp\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES\\UserProfiles\\" + generatedFileName;
//
//                InputStream is = profilePic.getInputStream();
//                FileOutputStream os = new FileOutputStream(uploadPath);
//                FileCopyUtils.copy(is, os);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//
//            int id = userService.register(user);
//            RegistrationStatus status = new RegistrationStatus();
//            status.setStatus(true);
//            status.setStatusMessage("Registration successful!");
//            status.setId(id);
//
//            return new ResponseEntity<>(status, HttpStatus.OK);
//
//        } catch (UserServiceException e) {
//            RegistrationStatus status = new RegistrationStatus();
//            status.setStatus(false);
//            status.setStatusMessage(e.getMessage());
//
//            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
//        }
//    }


    
    
    
    
    
    //--------------UPDATE USER API----------
    
    @PatchMapping("/user-update")
    public ResponseEntity<RegistrationStatus> update(UserDetail userDetails) {
        try {
            User user = new User();
            BeanUtils.copyProperties(userDetails, user);

            try {
                String fileName = userDetails.getProfilePic().getOriginalFilename();
                String generatedFileName = fileName;

                user.setProfilePic(generatedFileName);

                // Update the path to your desired directory
                String uploadPath = "C:" + File.separator + "ReactSpringbootApp" + File.separator +
                        "ReactSpringApp" + File.separator + "JewelleryPROJECT" +
                        File.separator + "All-IMAGES" + File.separator + "UserProfiles" +
                        File.separator + generatedFileName;

               InputStream is = userDetails.getProfilePic().getInputStream();
               FileOutputStream os = new FileOutputStream(uploadPath);
               FileCopyUtils.copy(is, os);
            } catch (IOException e) {
            }

            int id = userService.update(user);
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("User Updated Successful!");
            status.setId(id);

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (UserServiceException e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }


    
    
    //---------------DELETE USER API----------
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            User fetchedUser = userService.fetchById(id);
            if (fetchedUser != null) {
                userService.PermanentlyDelete(fetchedUser);
                return ResponseEntity.ok("User with ID: " + fetchedUser.getUserId() + "User deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (UserServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
        }
    }

    
    //-------------GET ALL USERS --------------------
    @GetMapping("/all-users")
    public ResponseEntity<RegistrationStatus> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();

            RegistrationStatus status = new RegistrationStatus();
            status.setList(users);
            status.setStatus(true);
            status.setStatusMessage("All Users fetched successfully.");

            return new ResponseEntity<>(status, HttpStatus.OK);
        } catch (UserServiceException e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to fetch all Users: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    
    
    
    //----------------get user by id ----------xxxxxxxx---------
    @GetMapping("/user/fetch/{id}")
    public User fetchById(@PathVariable int id) {
        return userService.fetchById(id);
    }

    
    //--------------get profile picture of user by id--------------------
    
    @GetMapping(path = "/user/fetch/profilePic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getProfilePic(@PathVariable int id) {
        try {
            User user = userService.fetchById(id);
            String imagePath = "C:\\ReactSpringbootApp\\ReactSpringApp\\JewelleryPROJECT\\All-IMAGES\\UserProfiles\\" + user.getProfilePic();
            File file = new File(imagePath);

            if (file.exists()) {
                byte[] imageBytes = Files.readAllBytes(file.toPath());
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
            } else {
                throw new IOException("Image not found");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    
    
    
    
    //---------------USER LOGIN  API------------
    
    @PostMapping("/login-user")
    public ResponseEntity<RegistrationStatus> loginUser(@RequestBody User user) {
        try {
            User newUser = userService.login(user);

            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("Login Successful");
            status.setEmail(newUser.getUserEmail());
            status.setName(newUser.getUserName());
            status.setId(newUser.getUserId());

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage(e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    
    
    //--------------ADMIN-LOGIN API---------------
    @PostMapping("/admin-login")
	public RegistrationStatus isAdmin(@RequestBody User user) {
		try {
			Boolean isBoolean = userService.adminLogin(user);
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(isBoolean);
			status.setName("secret");
			status.setStatusMessage("Admin Login Successfull");
			return status;
		} catch (Exception e) {
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			return status;
		}
	}

    
    
}
