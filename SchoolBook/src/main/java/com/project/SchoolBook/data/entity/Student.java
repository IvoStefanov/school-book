package com.project.SchoolBook.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "student")
public class Student extends PersonalInformation {

    @NotNull
    @Enumerated
    private Grade grade;
}
