package com.project.SchoolBook.data.repository;

import com.project.SchoolBook.data.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
