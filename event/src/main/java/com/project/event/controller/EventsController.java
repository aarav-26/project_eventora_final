package com.project.event.controller;

import com.project.event.model.Events;
import com.project.event.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/events")
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @PostMapping("/add_event/{adminId}")
    public ResponseEntity<?> addEvent(@PathVariable Long adminId, @RequestBody Events event) {
        try {
            eventsService.addNewEvent(event, adminId);
            return ResponseEntity.ok("Event created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create event.");
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Events>> getAllEvents() {
        try {
            List<Events> eventsList = eventsService.getAllEvents();
            return ResponseEntity.ok(eventsList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/{eventId}")
    public ResponseEntity<?> getById(@PathVariable("eventId") Long eventId)
    {
        try {
            Events event = eventsService.getById(eventId);
            return ResponseEntity.ok(event);
        }catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/category")
    public List<Events> getEventsByCategory(@RequestParam String category) {
        return eventsService.getEventsByCategory(category);
    }
}
