import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="bg-dark text-white p-3" style={{ width: '220px', minHeight: '100vh' }}>
            <h4>Gestion RH</h4>
            <ul className="nav flex-column">
                <li className="nav-item my-2">
                    <Link to="/" className="nav-link text-white">Accueil</Link>
                </li>
                <li className="nav-item my-2">
                    <Link to="/employees" className="nav-link text-white">Employés</Link>
                </li>
                <li className="nav-item my-2">
                    <Link to="/candidats" className="nav-link text-white">Candidats</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;