package com.cdac.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
public class BlogDetail {

	private int id;
    private MultipartFile photoUrl;
    private int bloggerId; // Assuming you want to include bloggerId in DTO
    private String title;
    private String startDate;
    private String endDate;
    private String blogDescription;
    private int members;
    private double totalCost;
    private String transportationMode;
    private List<LogDetail> logs;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public MultipartFile getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(MultipartFile photoUrl) {
		this.photoUrl = photoUrl;
	}

	public int getBloggerId() {
		return bloggerId;
	}

	public void setBloggerId(int bloggerId) {
		this.bloggerId = bloggerId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getBlogDescription() {
		return blogDescription;
	}

	public void setBlogDescription(String blogDescription) {
		this.blogDescription = blogDescription;
	}

	public int getMembers() {
		return members;
	}

	public void setMembers(int members) {
		this.members = members;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public String getTransportationMode() {
		return transportationMode;
	}

	public void setTransportationMode(String transportationMode) {
		this.transportationMode = transportationMode;
	}

	public List<LogDetail> getLogs() {
		return logs;
	}

	public void setLogs(List<LogDetail> logs) {
		this.logs = logs;
	}
}
