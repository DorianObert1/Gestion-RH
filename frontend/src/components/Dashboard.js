import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [nbEmployees, setNbEmployees] = useState(0);
    const [nbCandidats, setNbCandidats] = useState(0);

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const [employeesRes, candidatsRes] = await Promise.all([
                axios.get('http://localhost:8080/api/employees'),
                axios.get('http://localhost:8080/api/candidats')
            ]);
            setNbEmployees(employeesRes.data.length);
            setNbCandidats(candidatsRes.data.length);
        } catch (error) {
            console.error("Erreur chargement dashboard :", error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Tableau de bord</h2>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Employés</h5>
                            <p className="card-text display-5">{nbEmployees}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card border-success shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Candidats</h5>
                            <p className="card-text display-5">{nbCandidats}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;