package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Integer>{

	List<Log> findByLog_Id(int logId);

	
}
