package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Blog;
import com.cdac.entity.Log;
import com.cdac.exception.BloggerServiceException;
import com.cdac.repository.LogRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LogService {
	@Autowired
	private LogRepository logRepository;
	
	public int addImages(Log log) {
	        Log savedLog = logRepository.save(log);
	        return savedLog.getLogId();
	}
	
	public void deleteImage(Log log) {  
		logRepository.delete(log);
	}
	
	public Log addLog(Log log) {
        return logRepository.save(log);
       
	}
	
	public void deleteBlog(Log log) {
		logRepository.delete(log);
	}
	
	public Log fetchByLogId(int logId) {
		Optional<Log> log = logRepository.findById(logId);     //doubt about findById
		
		//--------------------put in try{   } catch(Exception e) {e.message()} ---------------
		if(log.isPresent())
			return log.get();
		else
			throw new BloggerServiceException("Blog with id " + logId + " does not exist!");
		//-----------------------------------------------------------------------------------
		
		
	}
	
	public List<Log> fetchLogsByBlogId(int blogId) {
        return logRepository.findByBlogId(blogId);
    }
	
	
	
	public List<Log> fetchAllLogs() {
			return logRepository.findAll();
		}
}
