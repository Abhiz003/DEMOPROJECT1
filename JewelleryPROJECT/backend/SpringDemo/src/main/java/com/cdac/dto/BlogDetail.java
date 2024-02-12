package com.cdac.dto;

import org.springframework.web.multipart.MultipartFile;
import java.util.Date;

public class BlogDetail {

    private int id;
    private MultipartFile photoUrl;
    private int bloggerId;
    private String title;
    private Date startDate;
    private Date endDate;
    private String blogDescription;
    private int members;
    private double totalCost;
    private String transportationMode;

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
}
