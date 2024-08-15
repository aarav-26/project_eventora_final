package com.project.event.repository;

import com.project.event.model.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminsRepo extends JpaRepository<Admins,Long> {

    @Query("SELECT a FROM Admins a WHERE a.email = ?1 AND a.password = ?2")
    Admins findByEmailAndPassword(String email, String password);
}
