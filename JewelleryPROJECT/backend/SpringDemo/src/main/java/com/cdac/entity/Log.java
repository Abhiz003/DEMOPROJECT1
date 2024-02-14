package com.cdac.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="log")
public class Log {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "new_user_sequence")
	@SequenceGenerator(name = "new_user_sequence",sequenceName = "sequence_for_new_user", allocationSize = 1,initialValue = 1000)
    @Column(name = "log_id")
	private int logId;
	
	@Column(name = "place_name")
	private String placeName;
	
	@Column(name = "start_time")
    private String startTime;
    
	@Column(name = "exit_time")
    private String exitTime;
    
    @Column(name = "image_url")
    private String images; // You might want to handle file uploads differently
    
    @Column( name="description", length = 3000)
    private String description;
    
    @Column(name = "pass_amount")
    private String passAmount;
    
    @Column(name = "location")
    private String location;
    
    
    @ManyToOne
    @JoinColumn(name = "blog_id") 
    private Blog blog;

	public int getLogId() {
		return logId;
	}

	public void setLogId(int logId) {
		this.logId = logId;
	}

	public String getPlaceName() {
		return placeName;
	}

	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getExitTime() {
		return exitTime;
	}

	public void setExitTime(String exitTime) {
		this.exitTime = exitTime;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPassAmount() {
		return passAmount;
	}

	public void setPassAmount(String passAmount) {
		this.passAmount = passAmount;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
	}
    
    
    
  
    
    
}
