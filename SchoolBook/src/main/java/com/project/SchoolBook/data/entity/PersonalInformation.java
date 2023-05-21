package com.project.SchoolBook.data.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public class PersonalInformation extends BaseEntity {

    @NotBlank
    @Size(min = 5, max = 50, message = "Name must be min 5 symbols and max 50")
    private String name;

    @NotBlank
    @Size(min = 5, max = 50, message = "Address must be min 5 symbols and max 50")
    private String address;

    @NotBlank
    @Size(min = 5, max = 150, message = "Contact must be min 5 symbols and max 150")
    private String contact;
}
