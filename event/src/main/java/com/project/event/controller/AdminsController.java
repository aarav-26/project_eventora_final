package com.project.event.controller;

import com.project.event.dto.StatisticsResponse;
import com.project.event.model.Admins;
import com.project.event.model.Events;
import com.project.event.service.AdminsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminsController {

    @Autowired
    private AdminsService adminsService;

    @PostMapping("/add_admin")
    public ResponseEntity<Admins> addNewAdmin(@RequestBody Admins newadmin)
    {
        Admins admin = adminsService.addNewAdmin(newadmin);
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/login/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable("email") String email, @PathVariable("password") String password) {
        try {
            Admins validAdmin = adminsService.getByEmailAndPassword(email, password);
            if (validAdmin != null) {
                if (validAdmin.isVerified()) {
                    return ResponseEntity.ok(validAdmin);
                } else {
                    return ResponseEntity.status(403).body("Not Verified");  // Forbidden
                }
            } else {
                return ResponseEntity.status(401).build();  // Unauthorized
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();  // Internal Server Error
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Admins> updateAdmin(@PathVariable("id") Long id, @RequestBody Admins admin) {
        try {
            Admins updatedAdmin = adminsService.updateAdmin(id, admin);
            if (updatedAdmin != null) {
                return ResponseEntity.ok(updatedAdmin);
            } else {
                return ResponseEntity.status(404).build();  // Admin not found
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();  // Internal Server Error
        }
    }

    @GetMapping("/get/list/{id}")
    public ResponseEntity<?> getAdminEvents(@PathVariable("id") Long id) {
        try {
            List<Events> events = adminsService.getListOfEvents(id);
            if (!events.isEmpty()) {
                return ResponseEntity.ok(events);
            } else {
                return ResponseEntity.status(404).body("No Events Found");  // Not Found
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();  // Internal Server Error
        }
    }

}
