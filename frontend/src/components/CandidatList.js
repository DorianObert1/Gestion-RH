import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CandidatList() {
    const [candidats, setCandidats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCandidats();
    }, []);

    const fetchCandidats = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/candidats');
            setCandidats(res.data);
        } catch (error) {
            console.error('Erreur chargement candidats :', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce candidat ?")) {
            await axios.delete(`http://localhost:8080/api/candidats/${id}`);
            fetchCandidats();
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Candidats</h2>
                <button className="btn btn-primary" onClick={() => navigate('/candidats/add')}>
                    Ajouter un candidat
                </button>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Domaine technique</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {candidats.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">Aucun candidat trouvé.</td>
                    </tr>
                ) : (
                    candidats.map(c => (
                        <tr key={c.id}>
                            <td>{`${c.nom} ${c.prenom}`}</td>
                            <td>{c.domaineTechnique}</td>
                            <td>{c.email}</td>
                            <td>{c.telephone}</td>
                            <td>
                                <button className="btn btn-success btn-sm me-2" onClick={() => navigate(`/candidats/view/${c.id}`)}>Voir</button>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/candidats/edit/${c.id}`)}>Mettre à jour</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default CandidatList;