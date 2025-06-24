import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/employees');
            setEmployees(res.data);
        } catch (error) {
            console.error('Erreur lors du chargement des employés:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer cet employé ?')) {
            try {
                await axios.delete(`http://localhost:8080/api/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'employé:', error);
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des employés</h2>
                <button className="btn btn-primary" onClick={() => navigate('/employees/add')}>
                    Ajouter un employé
                </button>
            </div>

            <table className="table table-striped align-middle">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Occupation/Poste</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(employees) && employees.length > 0 ? (
                    employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.nom} {emp.prenom}</td>
                            <td>{emp.poste}</td>
                            <td>{emp.email}</td>
                            <td>{emp.telephone || '-'}</td>
                            <td>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => navigate(`/employees/view/${emp.id}`)}
                                >
                                    Voir
                                </button>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => navigate(`/employees/edit/${emp.id}`)}
                                >
                                    Mettre à jour
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(emp.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                            Aucun employé trouvé.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;