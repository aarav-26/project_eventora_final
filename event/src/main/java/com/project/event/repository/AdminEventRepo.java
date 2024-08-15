package com.project.event.repository;

import com.project.event.model.AdminEvent;
import com.project.event.model.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AdminEventRepo extends JpaRepository<AdminEvent, Integer> {

    @Query("SELECT e.event FROM AdminEvent e WHERE e.admin.adminId = :adminId")
    List<Events> findEventsByAdminId(@Param("adminId") Long adminId);

}
