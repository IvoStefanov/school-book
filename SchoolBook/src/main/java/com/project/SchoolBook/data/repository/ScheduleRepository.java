package com.project.SchoolBook.data.repository;

import com.project.SchoolBook.data.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
