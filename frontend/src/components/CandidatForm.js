import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CandidatForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [candidat, setCandidat] = useState({
        nom: '',
        prenom: '',
        numeroIdentification: '',
        adresse: '',
        dateNaissance: '',
        email: '',
        telephone: '',
        domaineTechnique: '',
        evaluation: '',
        dateEntretien: '',
        observation: ''
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/candidats/${id}`)
                .then(res => setCandidat(res.data))
                .catch(err => console.error('Erreur chargement candidat :', err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidat(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/candidats/${id}`, candidat);
            } else {
                await axios.post('http://localhost:8080/api/candidats', candidat);
            }
            navigate('/candidats');
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Mettre à jour les données du candidat' : 'Ajouter un candidat'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label>Nom</label>
                        <input type="text" className="form-control" name="nom" value={candidat.nom} onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <label>Prénom</label>
                        <input type="text" className="form-control" name="prenom" value={candidat.prenom} onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <label>Numéro d'identification</label>
                        <input type="text" className="form-control" name="numeroIdentification" value={candidat.numeroIdentification} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label>Adresse</label>
                        <input type="text" className="form-control" name="adresse" value={candidat.adresse} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Date de naissance</label>
                        <input type="date" className="form-control" name="dateNaissance" value={candidat.dateNaissance} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label>Adresse email</label>
                        <input type="email" className="form-control" name="email" value={candidat.email} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Numéro de téléphone</label>
                        <input type="tel" className="form-control" name="telephone" value={candidat.telephone} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label>Domaine technique</label>
                        <input type="text" className="form-control" name="domaineTechnique" value={candidat.domaineTechnique} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Évaluation (1-10)</label>
                        <input type="number" min="1" max="10" className="form-control" name="evaluation" value={candidat.evaluation} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Date de l'entretien</label>
                        <input type="date" className="form-control" name="dateEntretien" value={candidat.dateEntretien} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-3">
                    <label>Observation</label>
                    <textarea className="form-control" name="observation" value={candidat.observation} onChange={handleChange} rows={3}></textarea>
                </div>

                <button type="submit" className="btn btn-primary me-2">Sauvegarder le candidat</button>
                <button type="button" className="btn btn-danger" onClick={() => navigate('/candidats')}>Annuler</button>
            </form>
        </div>
    );
}

export default CandidatForm;