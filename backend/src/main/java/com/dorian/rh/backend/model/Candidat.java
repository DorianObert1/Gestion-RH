package com.dorian.rh.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String numeroIdentification;
    private String adresse;
    private LocalDate dateNaissance;
    private String email;
    private String telephone;
    private String domaineTechnique;
    private Integer evaluation;
    private LocalDate dateEntretien;
    private String observation;

    private LocalDate dateCandidature;
    private String statut;
}