package com.dorian.rh.backend.service;

import com.dorian.rh.backend.model.Absence;
import com.dorian.rh.backend.repository.AbsenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbsenceService {

    private final AbsenceRepository repository;

    public AbsenceService(AbsenceRepository repository) {
        this.repository = repository;
    }

    public Absence create(Absence absence) {
        return repository.save(absence);
    }

    public List<Absence> getAll() {
        return repository.findAll();
    }

    public List<Absence> getByEmployeeId(Long employeeId) {
        return repository.findByEmployeeId(employeeId);
    }
}