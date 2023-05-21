package com.project.SchoolBook.data.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "schedule")
public class Schedule {
    @NotNull
    @JoinColumn(name = "school_id")
    private School school;

    @NotNull
    @Enumerated
    private Grade grade;

    @NotNull
    @Enumerated
    private Subject subject;

    @NotNull
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @NotNull
    @Enumerated
    private Date date;


}
