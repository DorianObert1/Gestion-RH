package com.dorian.rh.backend.service;

import com.dorian.rh.backend.model.Candidat;
import com.dorian.rh.backend.repository.CandidatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatService {

    private final CandidatRepository repository;

    public CandidatService(CandidatRepository repository) {
        this.repository = repository;
    }

    public List<Candidat> getAll() {
        return repository.findAll();
    }

    public Optional<Candidat> getById(Long id) {
        return repository.findById(id);
    }

    public Candidat create(Candidat candidat) {
        return repository.save(candidat);
    }

    public Candidat update(Long id, Candidat updated) {
        updated.setId(id);
        return repository.save(updated);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}