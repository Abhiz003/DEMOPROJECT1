package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.entity.User;
import com.cdac.entity.User.UserStatus;
import com.cdac.exception.UserServiceException;
import com.cdac.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;
	 
	
	/**
	 * ------Register user service------
	 * 
	 * @param user
	 * @return
	 */
	public int register(User user) {
	    Optional<User> isUserAlreadyPresent = userRepository.findByUserEmail(user.getUserEmail());
	    if (isUserAlreadyPresent.isEmpty()) {
	    	//password encrypted here ------------------xxxxxxxxxx---------------xxxxxxx--------------
	    	 String encodedPassword = passwordEncoder.encode(user.getUserPassword());
	    	user.setUserPassword(encodedPassword);
	    	
	        User savedUser = userRepository.save(user);        //befor passing thsi object make sure password is hashed and setPassword()
	        savedUser.setUserStatus(UserStatus.ACTIVE);
	        return savedUser.getUserId();
	    } else {
	        throw new UserServiceException("Oops! Looks like you've already claimed your spot in our exclusive club.");
	    }
	}

	
	
	
	public User login(User user) {
	    Optional<User> isUserPresent = userRepository.findByUserEmail(user.getUserEmail());
	    if (isUserPresent.isPresent()) {
	        User existingUser = isUserPresent.get();
	        
	        
//	        if (user.getUserPassword().equals(existingUser.getUserPassword())) {
	        	
	        if (passwordEncoder.matches(user.getUserPassword(),existingUser.getUserPassword())) {
	        	
	        	if(existingUser.getUserStatus() == UserStatus.ACTIVE) {
		            return existingUser;
	        	}
	        	else {
	        		throw new UserServiceException("Your Account Status is Deactivated, To Activate Connect to the Admin");
	        	}
	        } else {
	            throw new UserServiceException("Uh-oh! The secret password didn't quite match. Please try again.");
	        }
	    } else {
	        throw new UserServiceException("Oops! We couldn't find anyone with that email. Double-check or join our community!");
	    }
	}


	
	
	
	public Boolean adminLogin(User user) {
	    if ("admin@gmail.com".equals(user.getUserEmail())) {
	        if ("Admin@123".equals(user.getUserPassword())) {
	            return true;
	        } else {
	            throw new UserServiceException("Oops! Password is as mysterious as a black hole. Try again!");
	        }
	    } else {
	        throw new UserServiceException("Sorry, you are not an admin. Go and explore the user API instead of the admin portal.");
	    }
	}
	
	
	
	/**
	 * Update User service
	 * @param user
	 * @return
	 */
	public int update(User user) {
	    Optional<User> optionalUser = userRepository.findById(user.getUserId());

	    if (optionalUser.isPresent()) {
	        
	        User existingUser = optionalUser.get();
	        existingUser.setUserName(user.getUserName());
	        existingUser.setUserEmail(user.getUserEmail());
	        existingUser.setUserPhone(user.getUserPhone());
	        
	        //----------password encrypted here ---------------------------
	        String encodedPassword = passwordEncoder.encode(user.getUserPassword());
	        existingUser.setUserPassword(encodedPassword); 
	        
	        existingUser.setProfilePic(user.getProfilePic());
	        
	        User updatedUser = userRepository.save(existingUser);
	        
	        updatedUser.setUserStatus(UserStatus.ACTIVE);
	        return updatedUser.getUserId();
	    } else {
	        throw new UserServiceException("User not found with ID: " + user.getUserId());
	    }
	}
	
	public void delete(User user) {
	     userRepository.save(user);
	}
	public void PermanentlyDelete(User user) {
	     userRepository.delete(user);
	}

	public User fetchById(int id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent())
			return user.get();
		else
			throw new UserServiceException("User with id " + id + " does not exist!");
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public void reActiveUser(User fetchedUser) {
		userRepository.save(fetchedUser);
		
	}
}
