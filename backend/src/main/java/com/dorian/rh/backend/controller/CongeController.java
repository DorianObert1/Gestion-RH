package com.dorian.rh.backend.controller;

import com.dorian.rh.backend.model.Conge;
import com.dorian.rh.backend.service.CongeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conges")
@CrossOrigin(origins = "http://localhost:3000")
public class CongeController {

    private final CongeService service;

    public CongeController(CongeService service) {
        this.service = service;
    }

    @PostMapping
    public Conge create(@RequestBody Conge conge) {
        return service.create(conge);
    }

    @GetMapping
    public List<Conge> getAll() {
        return service.getAll();
    }
}