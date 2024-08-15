package com.project.event.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name="events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private String startDate; // Date part of the event

    @Column(nullable = false)
    private String endDate; // Time part of the event

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String description;

    private String mapLink;

    @Column(name = "registration_count")
    private Integer registrationCount=0; // Number of registrations

    private String activities;

    private String registrationDeadline;

    private Integer registrationFees;

    private String ContactDetails;

    private Integer capacity;

    private String schedule;

    private String guest;

    private String specialRequirements;

    private String socialMediaLinks;

    private String organizers;

    private String sponsors;

    private String ticketingInformation;

    private String accessibilityInformation;

    private String parkingInformation;

    private String accommodationInformation;

    private String healthAndSafetyGuidelines;

    @Column(name = "event_category")
    private String eventCategory; // Category of the event

    @Lob
    @Column(name = "event_poster", columnDefinition = "LONGTEXT")
    private String eventPoster; // Poster of the event in base64 string format

    @Lob
    @Column(name = "event_image", columnDefinition = "LONGTEXT")
    private String eventImage; // Image of the event in base64 string format
}
