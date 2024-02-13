package com.cdac.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Blogger;

public class BlogDetail {

	private int id;
    private MultipartFile photoUrl;
    private int bloggerId; // Assuming you want to include bloggerId in DTO
    private String title;
    private Date startDate;
    private Date endDate;
    private String blogDescription;
    private int members;
    private double totalCost;
    private String transportationMode;
    private List<LogDetail> logs;

    // Constructors, getters, and setters

    // Constructor without logs
    public BlogDetail(int id, MultipartFile photoUrl, int bloggerId, String title, Date startDate, Date endDate,
            String blogDescription, int members, double totalCost, String transportationMode) {
        this.id = id;
        this.photoUrl = photoUrl;
        this.bloggerId = bloggerId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.blogDescription = blogDescription;
        this.members = members;
        this.totalCost = totalCost;
        this.transportationMode = transportationMode;
    }

    // Constructor with logs
    public BlogDetail(int id, MultipartFile photoUrl, int bloggerId, String title, Date startDate, Date endDate,
            String blogDescription, int members, double totalCost, String transportationMode, List<LogDetail> logs) {
        this(id, photoUrl, bloggerId, title, startDate, endDate, blogDescription, members, totalCost,
                transportationMode);
        this.logs = logs;
    }

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

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
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
