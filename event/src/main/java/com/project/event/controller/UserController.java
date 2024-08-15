package com.project.event.controller;

import com.project.event.dto.UserEventDTO;
import com.project.event.dto.UserUpdateDTO;
import com.project.event.model.Events;
import com.project.event.model.UserEvent;
import com.project.event.model.Users;
import com.project.event.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Executable;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users_value")
    public Users addUser(@RequestBody Users user)
    {
        Users user1 = userService.addNewUser(user);
        return user1;
    }

    @GetMapping("/login/{email}/{password}")
    public ResponseEntity<Users> login(@PathVariable("email") String email, @PathVariable("password") String password) {
        try {
            Users validUser = userService.getByEmailAndPassword(email, password);
            if (validUser != null) {
                return ResponseEntity.ok(validUser);
            } else {
                return ResponseEntity.status(401).build();  // Unauthorized
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();  // Internal Server Error
        }
    }

    @PostMapping("/register/{userId}/{eventId}")
    public ResponseEntity<?> registerForEvent(@PathVariable("userId") Long userId, @PathVariable("eventId") Long eventId) {
        try {
            UserEvent userEvent = userService.registerEvent(userId, eventId);
            return ResponseEntity.ok("Event Registered SuccessFully");
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/registered/{userId}")
    public ResponseEntity<?> getRegisteredEvents(@PathVariable Long userId) {
        try {
            List<Events> registeredEvents = userService.getRegisteredEvents(userId);
            return ResponseEntity.ok(registeredEvents);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get/participants/{eventId}")
    public List<UserEventDTO> getParticipants(@PathVariable Long eventId) {
        return userService.getUsersByEventId(eventId);
    }

    @PutMapping("/updateDetails/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserUpdateDTO userUpdateDTO)
    {
        try{
            Users user = userService.updateProfile(userId,userUpdateDTO);
            return ResponseEntity.ok("Updated Suceesfully");
        }catch (Exception e){
            return ResponseEntity.status(500).build();
        }
    }

}
