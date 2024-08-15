package com.project.event.service;

import com.project.event.dto.StatisticsResponse;
import com.project.event.model.AdminEvent;
import com.project.event.model.Admins;
import com.project.event.model.Events;
import com.project.event.repository.AdminEventRepo;
import com.project.event.repository.AdminsRepo;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminsService {

    @Autowired
    private AdminsRepo adminsRepo;

    @Autowired
    private AdminEventRepo adminEventRepo;

    public Admins addNewAdmin(Admins newadmin) {
        return adminsRepo.save(newadmin);
    }

    public Admins getByEmailAndPassword(String email, String password) {
        return adminsRepo.findByEmailAndPassword(email, password);
    }

    public Admins updateAdmin(Long id, Admins admin) {
        Optional<Admins> existingAdminOptional = adminsRepo.findById(id);
        if (existingAdminOptional.isPresent()) {
            Admins existingAdmin = existingAdminOptional.get();
            existingAdmin.setUserName(admin.getUserName());
            existingAdmin.setEmail(admin.getEmail());
            existingAdmin.setPassword(admin.getPassword());
            existingAdmin.setAge(admin.getAge());
            existingAdmin.setRole(admin.getRole());
            existingAdmin.setCompany(admin.getCompany());
            existingAdmin.setIdCardPhoto(admin.getIdCardPhoto());
            existingAdmin.setPhoneNumber(admin.getPhoneNumber());
            // Update other fields as necessary

            return adminsRepo.save(existingAdmin);
        } else {
            return null;  // Admin not found
        }
    }


    public List<Events> getListOfEvents(Long id) {
        List<Events> adminEvents = adminEventRepo.findEventsByAdminId(id);
        return adminEvents != null ? adminEvents : List.of(); // Return empty list if no events found
    }

}
