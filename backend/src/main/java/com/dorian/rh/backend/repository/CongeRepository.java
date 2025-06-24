package com.dorian.rh.backend.repository;

import com.dorian.rh.backend.model.Conge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CongeRepository extends JpaRepository<Conge, Long> {
}