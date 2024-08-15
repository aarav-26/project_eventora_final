package com.project.event.repository;

import com.project.event.model.Events;
import com.project.event.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<Users,Long> {

    @Query("SELECT u FROM Users u WHERE u.email = ?1 AND u.password = ?2")
    Users findByEmailAndPassword(String email, String password);


}
