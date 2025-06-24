package com.dorian.rh.backend.repository;

import com.dorian.rh.backend.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {
    List<Absence> findByEmployeeId(Long employeeId);
}