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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.RegistrationStatus;
import com.cdac.dto.UserDetail;
import com.cdac.entity.User;
import com.cdac.entity.User.UserStatus;
import com.cdac.exception.UserServiceException;
import com.cdac.service.UserService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

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
                String uploadPath = "C:" + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + generatedFileName;

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
                String uploadPath = "C:" + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + generatedFileName;

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

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            User fetchedUser = userService.fetchById(id);
            if (fetchedUser != null) {
                fetchedUser.setUserStatus(UserStatus.DELETED);
                userService.delete(fetchedUser);
                return ResponseEntity.ok("User with ID: " + fetchedUser.getUserId() + " deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (UserServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
        }
    }

    @PostMapping("/reactive-user/{id}")
    public ResponseEntity<?> reActiveUser(@PathVariable int id) {
        try {
            User fetchedUser = userService.fetchById(id);
            if (fetchedUser != null) {
                fetchedUser.setUserStatus(UserStatus.ACTIVE);
                userService.reActiveUser(fetchedUser);
                return ResponseEntity.ok("User with ID: " + fetchedUser.getUserId() + " Reactivated Successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (UserServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
        }
    }

    @DeleteMapping("/permanently-delete-user/{id}")
    public ResponseEntity<?> PermanentlyDeleteUser(@PathVariable int id) {
        try {
            User fetchedUser = userService.fetchById(id);
            if (fetchedUser != null) {
                userService.PermanentlyDelete(fetchedUser);
                return ResponseEntity.ok("User with ID: " + fetchedUser.getUserId() + "Permanently deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (UserServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
        }
    }

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

    @GetMapping("/user/fetch/{id}")
    public User fetchById(@PathVariable int id) {
        return userService.fetchById(id);
    }

    @GetMapping(path = "/user/fetch/profilePic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getProfilePic(@PathVariable int id) throws IOException {
        User user = userService.fetchById(id);
        return Files.readAllBytes(Paths.get("C:" + File.separator + "ReactSpringApp" + File.separator + "JewelleryPROJECT" + File.separator + "All-IMAGES" + File.separator + user.getProfilePic()));
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
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

    
    
    
}
