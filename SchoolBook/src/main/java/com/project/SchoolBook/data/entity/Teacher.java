package com.project.SchoolBook.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
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
@Table(name = "teacher")
public class Teacher extends PersonalInformation {

    @NotNull
    @Enumerated
    private List<Subject> subjects;
}
