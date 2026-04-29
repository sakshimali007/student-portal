package com.example.smart_student_portal.controller;

import com.example.smart_student_portal.entity.Student;
import com.example.smart_student_portal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    // ✅ GET all students
    @GetMapping
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // ✅ GET student by ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // ✅ ADD new student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return repo.save(student);
    }

    // ✅ UPDATE student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student newStudent) {
        Student student = repo.findById(id).orElse(null);

        if (student != null) {
            student.setName(newStudent.getName());
            student.setEmail(newStudent.getEmail());
            student.setCourse(newStudent.getCourse());
            return repo.save(student);
        }

        return null;
    }

    // ✅ DELETE student
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // ✅ SEARCH student by name
    @GetMapping("/search/{name}")
    public List<Student> searchStudent(@PathVariable String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }
}