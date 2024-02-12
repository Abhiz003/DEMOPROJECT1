package com.cdac.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Log {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int logId;
	private String placeName;
    private String startTime;
    private String exitTime;
    private String images; // You might want to handle file uploads differently
    private String description;
    private boolean passRequired;
    private String passAmount;
    private String location;
    
    
    
    
    
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isPassRequired() {
		return passRequired;
	}
	public void setPassRequired(boolean passRequired) {
		this.passRequired = passRequired;
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
	
	
	
	
	
	public String getImages() {
		return images;
	}
	public void setImages(String images) {
		this.images = images;
	}

    
    
    
}
