package com.project.event.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "adminevents")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer eventCreationId;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private Admins admin;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Events event;

}
