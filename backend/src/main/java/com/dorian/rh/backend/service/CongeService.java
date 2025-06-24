package com.dorian.rh.backend.service;

import com.dorian.rh.backend.model.Conge;
import com.dorian.rh.backend.repository.CongeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CongeService {

    private final CongeRepository repository;

    public CongeService(CongeRepository repository) {
        this.repository = repository;
    }

    public Conge create(Conge conge) {
        return repository.save(conge);
    }

    public List<Conge> getAll() {
        return repository.findAll();
    }
}