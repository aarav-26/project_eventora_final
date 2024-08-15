package com.project.event.service;

import com.project.event.dto.UserEventDTO;
import com.project.event.dto.UserUpdateDTO;
import com.project.event.model.Events;
import com.project.event.model.UserEvent;
import com.project.event.model.Users;
import com.project.event.repository.EventsRepo;
import com.project.event.repository.UserEventRepo;
import com.project.event.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserEventRepo userEventRepo;

    @Autowired
    private EventsRepo eventsRepo;

    public Users addNewUser(Users user) {
        return userRepo.save(user);
    }

    public Users getByEmailAndPassword(String email, String password) {
        return userRepo.findByEmailAndPassword(email, password);
    }

    public UserEvent registerEvent(Long userId, Long eventId) throws Exception {
        Optional<Users> userOpt = userRepo.findById(userId);
        Optional<Events> eventOpt = eventsRepo.findById(eventId);

        if (userOpt.isEmpty() || eventOpt.isEmpty()) {
            throw new Exception("User or Event not found");
        }

        Users user = userOpt.get();
        Events event = eventOpt.get();

        int count = event.getRegistrationCount();
        count += 1;

        event.setRegistrationCount(count);

        UserEvent userEvent = new UserEvent();
        userEvent.setUser(user);
        userEvent.setEvent(event);
        userEvent.setRegistrationDate(LocalDateTime.now());

        return userEventRepo.save(userEvent);
    }

    public List<Events> getRegisteredEvents(Long userId) {
        return userEventRepo.findEventsByUserId(userId);
    }

    public List<UserEventDTO> getUsersByEventId(Long eventId) {
        return userEventRepo.findUsersByEventId(eventId);
    }

    public Users updateProfile(Long userId, UserUpdateDTO userUpdateDTO) throws Exception{
        Optional<Users> user1 = userRepo.findById(userId);

        if (user1.isEmpty()) {
            throw new Exception("User or Event not found");
        }

        Users user = user1.get();

        user.setUserName(userUpdateDTO.getUserName());
        user.setEmail(userUpdateDTO.getEmail());
        user.setCity(userUpdateDTO.getCity());
        user.setPhoneNumber(userUpdateDTO.getPhoneNumber());
        user.setAge(userUpdateDTO.getAge());

        return userRepo.save(user);
    }
}
