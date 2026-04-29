package com.example.smart_student_portal.entity;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String course;

    // GETTERS
    public Long getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public String getCourse() { return course; }

    // SETTERS
    public void setId(Long id) { this.id = id; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }

    public void setCourse(String course) { this.course = course; }
}