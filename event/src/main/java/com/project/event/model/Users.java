package com.project.event.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String userName;

    private String email;

    private String password;

    private Integer age;

    private String city;

    private String phoneNumber;

    @Lob
    @Column(name="profile_photo",columnDefinition = "LONGTEXT")
    private String profilePhoto;

}
