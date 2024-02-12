package com.cdac.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "bloggers")
public class Blogger {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "blogger_sequence")
	@SequenceGenerator(name = "blogger_sequence",sequenceName = "sequence_for_new_blogger", allocationSize = 1,initialValue = 1)
	private int bloggerId;
	
	@Column(length = 30)
	private String bloggerName;
	
	@Column(length = 30, unique = true)
	private String bloggerEmail;
	
	@Column(length = 10)
	private long bloggerPhone;
	
	@Column(nullable = false)
	private String bloggerPassword;
	
	private String profilePic;
	
	@Column(length = 3000 )
	private String bloggerDescription;
	
	@Enumerated(EnumType.STRING)
	private BloggerStatus bloggerStatus;
	
	public static enum BloggerStatus{
		ACTIVE,VERIFICATION_PENDING, INACTIVE, DELETED
	}
	
	@JsonManagedReference
	@OneToMany(mappedBy = "blogger", cascade = CascadeType.ALL)
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

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public String getBloggerDescription() {
		return bloggerDescription;
	}

	public void setBloggerDescription(String bloggerDescription) {
		this.bloggerDescription = bloggerDescription;
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

	public void setBlogPhotos(List<Blog> blogPhotos) {
		this.blogPhotos = blogPhotos;
	}

	
	
}
