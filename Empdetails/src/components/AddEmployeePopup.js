// src/components/AddEmployeePopup.js

import React, { useState, useEffect } from 'react';

function AddEmployeePopup({ isOpen, onClose, onAddEmployee, onUpdateEmployee, selectedEmployee }) {
  const [employee, setEmployee] = useState({ name: '', id: '', email: '', domain: '',Phone_No:'' });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleAddEmployee = () => {
    onAddEmployee(employee);
    onClose();
  };

  const handleUpdateEmployee = () => {
    onUpdateEmployee(employee);
    onClose();
  };

  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup">
          <h2>{selectedEmployee ? 'Update Employee Details' : 'Add Employee Details'}</h2>
          <label>
            Name:
            <input type="text" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
          </label>
          <label>
            ID:
            <input type="text" value={employee.id} onChange={(e) => setEmployee({ ...employee, id: e.target.value })} />
          </label>
          <label>
            Email:
            <input type="text" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
          </label>
          <label>
            Domain:
            <input type="text" value={employee.domain} onChange={(e) => setEmployee({ ...employee, domain: e.target.value })} />
          </label>
          <label>
            Phone_No:
            <input type="text" value={employee.Phone_No} onChange={(e) => setEmployee({ ...employee, Phone_No: e.target.value })} />
          </label>
          <div>
            {selectedEmployee ? (
              <button onClick={handleUpdateEmployee}>Update Employee</button>
            ) : (
              <button onClick={handleAddEmployee}>Add Employee</button>
            )}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  );
}

export default AddEmployeePopup;
