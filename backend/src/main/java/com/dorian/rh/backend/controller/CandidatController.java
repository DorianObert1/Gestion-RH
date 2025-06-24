package com.dorian.rh.backend.controller;

import com.dorian.rh.backend.model.Candidat;
import com.dorian.rh.backend.service.CandidatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidats")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidatController {

    private final CandidatService service;

    public CandidatController(CandidatService service) {
        this.service = service;
    }

    @GetMapping
    public List<Candidat> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidat> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Candidat create(@RequestBody Candidat candidat) {
        return service.create(candidat);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidat> update(@PathVariable Long id, @RequestBody Candidat candidat) {
        return ResponseEntity.ok(service.update(id, candidat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}