package com.project.SchoolBook.data.repository;

import com.project.SchoolBook.data.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, Long> {
}
