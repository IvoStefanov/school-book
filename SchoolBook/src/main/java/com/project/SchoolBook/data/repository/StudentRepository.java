package com.project.SchoolBook.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository<Student> extends JpaRepository<Student, Long> {
}
