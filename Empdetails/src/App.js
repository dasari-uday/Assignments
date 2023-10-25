// src/App.js

import React, { useState } from 'react';
import './App.css';
import AddEmployeePopup from './components/AddEmployeePopup';
import UpdateEmployeePopup from './components/UpdateEmployeePopup';
import './components/AddEmployeePopup.css'

function App() {
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = (employee) => {
    // Assuming the employee object includes the 'id' field provided by the 'AddEmployeePopup'
    setEmployees([...employees, employee]);
    setAddPopupOpen(false);
  };
  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setUpdatePopupOpen(false);
    setSelectedEmployee(null);
  };
  

  const handleOpenUpdatePopup = (employee) => {
    setSelectedEmployee(employee);
    setUpdatePopupOpen(true);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="main">
      <h1>Employee Details</h1>
      <button id="AddEmp" onClick={() => setAddPopupOpen(true)}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>Emp_Name</th>
            <th>Emp_id</th>
            <th>Emp_mail</th>
            <th>Emp_domain</th>
            <th>Phone_No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.id}</td>
              <td>{employee.email}</td>
              <td>{employee.domain}</td>
              <td>{employee.Phone_No}</td>
              <td>
                <button  id="update" onClick={() => handleOpenUpdatePopup(employee)}>Update</button>
                <button id="delete" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddEmployeePopup
        isOpen={isAddPopupOpen}
        onClose={() => {
          setAddPopupOpen(false);
          setSelectedEmployee(null);
        }}
        onAddEmployee={handleAddEmployee}
        selectedEmployee={selectedEmployee}
      />

      <UpdateEmployeePopup
        isOpen={isUpdatePopupOpen}
        onClose={() => {
          setUpdatePopupOpen(false);
          setSelectedEmployee(null);
        }}
        onUpdateEmployee={handleUpdateEmployee}
        selectedEmployee={selectedEmployee}
      />
    </div>
  );
}

export default App;
