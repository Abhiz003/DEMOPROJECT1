package com.cdac.dto;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Blogger;

public class ArtDetail {
	    private int id;

	    private MultipartFile photoUrl;

	    private Blogger blogger;

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

		public Blogger getBlogger() {
			return blogger;
		}

		public void setArtist(Blogger blogger) {
			this.blogger = blogger;
		}
	    
	    
}
