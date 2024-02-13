package com.cdac.dto;

import org.springframework.web.multipart.MultipartFile;

public class LogDetail {
	
	private int logId;
    private String placeName;
    private String startTime;
    private String exitTime;
    private MultipartFile images; // You might want to handle file uploads differently
    private String description;
    private String passAmount;
    private String location;

    // Constructors, getters, and setters

    public LogDetail(int logId, String placeName, String startTime, String exitTime, MultipartFile images, String description,
            String passAmount, String location) {
        this.logId = logId;
        this.placeName = placeName;
        this.startTime = startTime;
        this.exitTime = exitTime;
        this.images = images;
        this.description = description;
        this.passAmount = passAmount;
        this.location = location;
    }

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

	public MultipartFile getImages() {
		return images;
	}

	public void setImages(MultipartFile images) {
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
}
