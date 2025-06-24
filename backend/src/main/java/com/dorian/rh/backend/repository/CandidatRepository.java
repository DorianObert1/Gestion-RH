package com.dorian.rh.backend.repository;

import com.dorian.rh.backend.model.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
}