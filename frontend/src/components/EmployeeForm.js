import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        nom: '',
        prenom: '',
        numeroIdentification: '',
        adresse: '',
        dateNaissance: '',
        email: '',
        telephone: '',
        poste: '',
        salaire: '',
        dateDebutContrat: '',
        dateFinContrat: '',
        dateEmbauche: '',
        observations: ''
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/employees/${id}`)
                .then(res => {
                    const data = res.data;
                    setEmployee({
                        ...data,
                        dateNaissance: data.dateNaissance ?? '',
                        dateDebutContrat: data.dateDebutContrat ?? '',
                        dateFinContrat: data.dateFinContrat ?? '',
                        dateEmbauche: data.dateEmbauche ?? ''
                    });
                })
                .catch(err => console.error('Erreur de chargement:', err));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/employees/${id}`, employee);
            } else {
                await axios.post('http://localhost:8080/api/employees', employee);
            }
            navigate('/employees');
        } catch (error) {
            console.error("Erreur d'enregistrement:", error);
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Modifier' : 'Ajouter'} un employé</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label>Nom</label>
                        <input type="text" className="form-control" name="nom" value={employee.nom} onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <label>Prénom</label>
                        <input type="text" className="form-control" name="prenom" value={employee.prenom} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label>Numéro d'identification</label>
                        <input type="text" className="form-control" name="numeroIdentification" value={employee.numeroIdentification} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Date de naissance</label>
                        <input type="date" className="form-control" name="dateNaissance" value={employee.dateNaissance} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-3">
                    <label>Adresse</label>
                    <input type="text" className="form-control" name="adresse" value={employee.adresse} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label>Téléphone</label>
                    <input type="tel" className="form-control" name="telephone" value={employee.telephone} onChange={handleChange} />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label>Poste</label>
                        <input type="text" className="form-control" name="poste" value={employee.poste} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Salaire (€)</label>
                        <input type="number" className="form-control" name="salaire" value={employee.salaire} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label>Début du contrat</label>
                        <input type="date" className="form-control" name="dateDebutContrat" value={employee.dateDebutContrat} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>Fin du contrat</label>
                        <input type="date" className="form-control" name="dateFinContrat" value={employee.dateFinContrat} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-3">
                    <label>Observations</label>
                    <textarea className="form-control" name="observations" value={employee.observations} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn btn-success">{id ? 'Enregistrer' : 'Créer'}</button>
            </form>
        </div>
    );
}

export default EmployeeForm;