package com.project.SchoolBook.data.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User extends BaseEntity {

  @NotBlank
  @Size(min = 5, max = 20, message = "Username must be min 5 symbols and max 20")
  private String username;

  @NotBlank
  @Size(min = 5, message = "Password must be min 5 symbols and max 20")
  private String password;

  @NotNull
  @Enumerated
  private Role role;
}