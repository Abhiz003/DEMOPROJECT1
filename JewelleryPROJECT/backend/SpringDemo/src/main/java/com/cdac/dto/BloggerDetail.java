package com.cdac.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Blog;

import jakarta.persistence.Column;

public class BloggerDetail {
	
	private int bloggerId;
	private String bloggerName;
	private String bloggerEmail;
	private long bloggerPhone;
	private String bloggerPassword;
	
	private MultipartFile profilePic;
	
	@Column(length = 3000 )
	private String bloggerDescription;
	
	private BloggerStatus bloggerStatus;
	
	public static enum BloggerStatus{
		ACTIVE, INACTIVE, DELETED
	}
	
	private List<Blog> blogPhotos;

	public int getBloggerId() {
		return bloggerId;
	}

	public void setBloggerId(int bloggerId) {
		this.bloggerId = bloggerId;
	}

	public String getBloggerName() {
		return bloggerName;
	}

	public void setBloggerName(String bloggerName) {
		this.bloggerName = bloggerName;
	}

	public String getBloggerEmail() {
		return bloggerEmail;
	}

	public void setBloggerEmail(String bloggerEmail) {
		this.bloggerEmail = bloggerEmail;
	}

	public long getBloggerPhone() {
		return bloggerPhone;
	}

	public void setBloggerPhone(long bloggerPhone) {
		this.bloggerPhone = bloggerPhone;
	}

	public String getBloggerPassword() {
		return bloggerPassword;
	}

	public void setBloggerPassword(String bloggerPassword) {
		this.bloggerPassword = bloggerPassword;
	}

	public MultipartFile getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(MultipartFile profilePic) {
		this.profilePic = profilePic;
	}


	public BloggerStatus getBloggerStatus() {
		return bloggerStatus;
	}

	public void setBloggerStatus(BloggerStatus bloggerStatus) {
		this.bloggerStatus = bloggerStatus;
	}

	public List<Blog> getBlogPhotos() {
		return blogPhotos;
	}

	public void setArtPhotos(List<Blog> blogPhotos) {
		this.blogPhotos = blogPhotos;
	}

	public String getBloggerDescription() {
		return bloggerDescription;
	}

	public void setBloggerDescription(String bloggerDescription) {
		this.bloggerDescription = bloggerDescription;
	}

}
