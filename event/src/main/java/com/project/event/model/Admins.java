package com.project.event.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="admins")
@AllArgsConstructor
@NoArgsConstructor
public class Admins {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long adminId;

    private String userName;
    private String email;
    private String password;
    private int age;
    private String role;
    private String company;

    @Lob
    @Column(name="id_card_photo", columnDefinition ="LONGTEXT")
    private String idCardPhoto;

    private String phoneNumber;

    private boolean isVerified=false;
}
