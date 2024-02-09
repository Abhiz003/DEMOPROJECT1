package com.cdac.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class UserBlog {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "user_sequence")
    @SequenceGenerator(name="user_sequence", sequenceName="user_sequence", initialValue=001)
	private Long blogId;
	private String title;
    private String startDate;
    private String endDate;
    private int members;
    private double totalCost;
    private String transportationMode;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "blog_id", referencedColumnName = "blogId")
    List < Log > logs = new ArrayList < > ();
    
    
	public Long getBlogId() {
		return blogId;
	}
	public void setBlogId(Long blogId) {
		this.blogId = blogId;
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
	public List<Log> getLogs() {
		return logs;
	}
	public void setLogs(List<Log> logs) {
		this.logs = logs;
	}

}
