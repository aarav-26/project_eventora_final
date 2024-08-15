package com.project.event.repository;

import com.project.event.dto.UserEventDTO;
import com.project.event.model.Events;
import com.project.event.model.UserEvent;
import com.project.event.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserEventRepo extends JpaRepository<UserEvent, Integer> {

    @Query("SELECT ue.event FROM UserEvent ue WHERE ue.user.id = :userId")
    List<Events> findEventsByUserId(Long userId);

    @Query("SELECT new com.project.event.dto.UserEventDTO(u.userName, u.email, u.phoneNumber) " +
            "FROM UserEvent ue " +
            "JOIN ue.user u " +
            "WHERE ue.event.id = :eventId")
    List<UserEventDTO> findUsersByEventId(@Param("eventId") Long eventId);

}
