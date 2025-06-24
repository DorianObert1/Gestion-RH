import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EmployeeView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    const [showCongeModal, setShowCongeModal] = useState(false);
    const [showAbsenceModal, setShowAbsenceModal] = useState(false);

    const [showConges, setShowConges] = useState(false);
    const [showAbsences, setShowAbsences] = useState(false);

    const [newConge, setNewConge] = useState({ dateDebut: '', dateFin: '' });
    const [newAbsence, setNewAbsence] = useState({ jour: '' });

    const fetchEmployee = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/employees/${id}`);
            setEmployee(res.data);
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    }, [id]);

    useEffect(() => {
        fetchEmployee();
    }, [fetchEmployee]);

    const handleAddConge = async () => {
        try {
            await axios.post('http://localhost:8080/api/conges', {
                ...newConge,
                employee: { id: employee.id }
            });
            setShowCongeModal(false);
            setNewConge({ dateDebut: '', dateFin: '' });
            fetchEmployee();
        } catch (error) {
            console.error("Erreur ajout congé :", error);
        }
    };

    const handleAddAbsence = async () => {
        try {
            await axios.post('http://localhost:8080/api/absences', {
                ...newAbsence,
                employee: { id: employee.id }
            });
            setShowAbsenceModal(false);
            setNewAbsence({ jour: '' });
            fetchEmployee();
        } catch (error) {
            console.error("Erreur ajout absence :", error);
        }
    };

    if (!employee) return <p className="m-4">Chargement...</p>;

    return (
        <div className="container">
            <h2 className="mb-4">Détails de l'employé</h2>

            <div className="mb-3">
                <button className="btn btn-warning me-2" onClick={() => navigate(`/employees/edit/${employee.id}`)}>Mettre à jour les données</button>
                <button className="btn btn-primary me-2" onClick={() => setShowCongeModal(true)}>Attribuer des congés</button>
                <button className="btn btn-warning me-2" onClick={() => setShowAbsenceModal(true)}>Signaler une absence</button>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Retour</button>
            </div>

            <table className="table table-bordered">
                <tbody>
                <tr><th>Nom</th><td>{employee.nom} {employee.prenom}</td></tr>
                <tr><th>Occupation</th><td>{employee.poste}</td></tr>
                <tr><th>Salaire</th><td>{employee.salaire} €</td></tr>
                <tr><th>Début du contrat</th><td>{employee.dateDebutContrat}</td></tr>
                <tr><th>Fin du contrat</th><td>{employee.dateFinContrat}</td></tr>
                <tr><th>Numéro d'identification</th><td>{employee.numeroIdentification}</td></tr>
                <tr><th>Date de naissance</th><td>{employee.dateNaissance}</td></tr>
                <tr><th>Adresse</th><td>{employee.adresse}</td></tr>
                <tr><th>Email</th><td>{employee.email}</td></tr>
                <tr><th>Téléphone</th><td>{employee.telephone}</td></tr>
                <tr><th>Observations</th><td>{employee.observations}</td></tr>
                </tbody>
            </table>

            {/* Congés */}
            <h5 className="mt-5 bg-light p-2" style={{ cursor: 'pointer' }} onClick={() => setShowConges(!showConges)}>
                {showConges ? '▼' : '▶'} Congés ({employee.conges?.length || 0})
            </h5>
            {showConges && (
                <table className="table table-sm table-striped">
                    <thead><tr><th>Début</th><th>Fin</th></tr></thead>
                    <tbody>
                    {employee.conges?.length > 0 ? employee.conges.map((c, i) => (
                        <tr key={i}><td>{c.dateDebut}</td><td>{c.dateFin}</td></tr>
                    )) : (
                        <tr><td colSpan="2" className="text-center">Aucun congé enregistré.</td></tr>
                    )}
                    </tbody>
                </table>
            )}

            {/* Absences */}
            <h5 className="mt-4 bg-light p-2" style={{ cursor: 'pointer' }} onClick={() => setShowAbsences(!showAbsences)}>
                {showAbsences ? '▼' : '▶'} Absences ({employee.absences?.length || 0})
            </h5>
            {showAbsences && (
                <table className="table table-sm table-striped">
                    <thead><tr><th>Jour</th></tr></thead>
                    <tbody>
                    {employee.absences?.length > 0 ? employee.absences.map((a, i) => (
                        <tr key={i}><td>{a.jour}</td></tr>
                    )) : (
                        <tr><td className="text-center">Aucune absence enregistrée.</td></tr>
                    )}
                    </tbody>
                </table>
            )}

            {/* MODALE CONGÉ */}
            {showCongeModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Donner des congés à l'employé</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCongeModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Date de début des congés</label>
                                <input type="date" className="form-control mb-2"
                                       value={newConge.dateDebut}
                                       onChange={(e) => setNewConge({ ...newConge, dateDebut: e.target.value })}
                                       required />
                                <label>Date de fin des congés</label>
                                <input type="date" className="form-control"
                                       value={newConge.dateFin}
                                       onChange={(e) => setNewConge({ ...newConge, dateFin: e.target.value })}
                                       required />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowCongeModal(false)}>Fermer</button>
                                <button className="btn btn-primary" onClick={handleAddConge}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODALE ABSENCE */}
            {showAbsenceModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Signaler une absence de l'employé</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAbsenceModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Date de l'absence</label>
                                <input type="date" className="form-control"
                                       value={newAbsence.jour}
                                       onChange={(e) => setNewAbsence({ jour: e.target.value })}
                                       required />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAbsenceModal(false)}>Fermer</button>
                                <button className="btn btn-primary" onClick={handleAddAbsence}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeView;