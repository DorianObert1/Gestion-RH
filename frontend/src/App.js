import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import CandidatList from './components/CandidatList';
import EmployeeForm from './components/EmployeeForm';
import CandidatForm from './components/CandidatForm';
import Dashboard from './components/Dashboard';
import EmployeeView from "./components/EmployeeView";
import CandidatView from "./components/CandidatView";

function App() {
  return (
      <Router>
        <div className="d-flex">
          <Sidebar />
          <div className="container-fluid p-4">
            <Routes>
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/candidats" element={<CandidatList />} />
              <Route path="/employees/add" element={<EmployeeForm />} />
              <Route path="/employees/edit/:id" element={<EmployeeForm />} />
              <Route path="/candidats/add" element={<CandidatForm />} />
              <Route path="/candidats/edit/:id" element={<CandidatForm />} />
              <Route path="/employees/view/:id" element={<EmployeeView />} />
              <Route path="/candidats/view/:id" element={<CandidatView />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;