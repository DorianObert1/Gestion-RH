import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CandidatView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidat, setCandidat] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/candidats/${id}`)
            .then(res => setCandidat(res.data))
            .catch(err => console.error("Erreur chargement candidat :", err));
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Supprimer ce candidat ?")) {
            await axios.delete(`http://localhost:8080/api/candidats/${id}`);
            navigate('/candidats');
        }
    };

    if (!candidat) {
        return <div className="container">Chargement...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Détails du candidat</h2>
            <div className="d-flex justify-content-start gap-2 mb-3">
                <button className="btn btn-primary" onClick={() => navigate(`/candidats/edit/${id}`)}>Mettre à jour les données</button>
                <button className="btn btn-danger" onClick={handleDelete}>Supprimer le candidat</button>
            </div>

            <table className="table table-bordered">
                <tbody>
                <tr>
                    <th>Nom</th>
                    <td>{candidat.nom} {candidat.prenom}</td>
                </tr>
                <tr>
                    <th>Numéro de carte d'identité</th>
                    <td>{candidat.numeroIdentification || '-'}</td>
                </tr>
                <tr>
                    <th>Date de naissance</th>
                    <td>{candidat.dateNaissance || '-'}</td>
                </tr>
                <tr>
                    <th>Adresse</th>
                    <td>{candidat.adresse || '-'}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{candidat.email}</td>
                </tr>
                <tr>
                    <th>Téléphone</th>
                    <td>{candidat.telephone}</td>
                </tr>
                <tr>
                    <th>Note (1-10)</th>
                    <td>{candidat.evaluation || '-'}</td>
                </tr>
                <tr>
                    <th>Domaine technique</th>
                    <td>{candidat.domaineTechnique || '-'}</td>
                </tr>
                <tr>
                    <th>Date de l'entretien</th>
                    <td>{candidat.dateEntretien || '-'}</td>
                </tr>
                <tr>
                    <th>Observation</th>
                    <td>{candidat.observation || '-'}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CandidatView;