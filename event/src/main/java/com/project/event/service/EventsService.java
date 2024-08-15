package com.project.event.service;


import com.project.event.model.AdminEvent;
import com.project.event.model.Admins;
import com.project.event.model.Events;
import com.project.event.repository.AdminEventRepo;
import com.project.event.repository.AdminsRepo;
import com.project.event.repository.EventsRepo;
import jdk.jfr.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventsService {

    @Autowired
    private EventsRepo eventsRepo;

    @Autowired
    private AdminEventRepo adminEventRepo;

    @Autowired
    private AdminsRepo adminsRepo;

    public Events addNewEvent(Events event,Long adminId)
    {
        Admins admin = adminsRepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        AdminEvent adminEvent = new AdminEvent(null,admin,event);
        Events event1 = eventsRepo.save(event);
        adminEventRepo.save(adminEvent);
        return event1;
    }

    public List<Events> getAllEvents() {
        return eventsRepo.findAll();
    }

    public Events getById(Long eventId) {
        return eventsRepo.findById(eventId).orElse(null);
    }

    public List<Events> getEventsByCategory(String category) {
        return eventsRepo.findByEventCategory(category);
    }
}
