package com.cdac.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Art;

public class BloggerDetail {
	
	private int bloggerId;
	private String bloggerName;
	private String bloggerEmail;
	private long bloggerPhone;
	private String bloggerPassword;
	
	private MultipartFile profilePic;
	
	private int artworksCreated;
	private int prizesWon;
	private String exhibitionsAttended;
	private String artStyle;
	
	private BloggerStatus bloggerStatus;
	
	public static enum BloggerStatus{
		ACTIVE, INACTIVE, DELETED
	}
	
	private List<Art> artPhotos;

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

	public int getArtworksCreated() {
		return artworksCreated;
	}

	public void setArtworksCreated(int artworksCreated) {
		this.artworksCreated = artworksCreated;
	}

	public int getPrizesWon() {
		return prizesWon;
	}

	public void setPrizesWon(int prizesWon) {
		this.prizesWon = prizesWon;
	}

	public String getExhibitionsAttended() {
		return exhibitionsAttended;
	}

	public void setExhibitionsAttended(String exhibitionsAttended) {
		this.exhibitionsAttended = exhibitionsAttended;
	}

	public String getArtStyle() {
		return artStyle;
	}

	public void setArtStyle(String artStyle) {
		this.artStyle = artStyle;
	}

	public BloggerStatus getBloggerStatus() {
		return bloggerStatus;
	}

	public void setBloggerStatus(BloggerStatus bloggerStatus) {
		this.bloggerStatus = bloggerStatus;
	}

	public List<Art> getArtPhotos() {
		return artPhotos;
	}

	public void setArtPhotos(List<Art> artPhotos) {
		this.artPhotos = artPhotos;
	}

}
