package com.cdac.entity;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Component
@Entity
@Table(name = "blog")
public class Blog {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "blog_id")
	    private int id;

    @Column(name = "photo_url")
    private String photoUrl;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "blogger_id") 
    private Blogger blogger;
    
    @Column(name = "title")
    private String title;
    
	 @Temporal(TemporalType.DATE)
	 @Column(name = "start_date")
	 private Date startDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "end_date")
	private Date endDate;
   
   @Column(name ="blog_description", length = 3000)
   private String blogDescription;
   
   private int members;
   
   @Column(name = "total_cost")
   private double totalCost;
   
   @Column(name = "transportation_mode")
   private String transportationMode;
   

   
   @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
   List <Log> logs;


public int getId() {
	return id;
}


public void setId(int id) {
	this.id = id;
}


public String getPhotoUrl() {
	return photoUrl;
}


public void setPhotoUrl(String photoUrl) {
	this.photoUrl = photoUrl;
}


public Blogger getBlogger() {
	return blogger;
}


public void setBlogger(Blogger blogger) {
	this.blogger = blogger;
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


public List<Log> getLogs() {
	return logs;
}


public void setLogs(List<Log> logs) {
	this.logs = logs;
}

   
    
}
