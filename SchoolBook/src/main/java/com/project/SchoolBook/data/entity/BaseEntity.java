package com.project.SchoolBook.data.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

}
