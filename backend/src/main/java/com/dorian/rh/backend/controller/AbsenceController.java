package com.dorian.rh.backend.controller;

import com.dorian.rh.backend.model.Absence;
import com.dorian.rh.backend.service.AbsenceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/absences")
@CrossOrigin(origins = "http://localhost:3000")
public class AbsenceController {

    private final AbsenceService service;

    public AbsenceController(AbsenceService service) {
        this.service = service;
    }

    @PostMapping
    public Absence create(@RequestBody Absence absence) {
        return service.create(absence);
    }

    @GetMapping
    public List<Absence> getAll() {
        return service.getAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Absence> getByEmployeeId(@PathVariable Long employeeId) {
        return service.getByEmployeeId(employeeId);
    }
}