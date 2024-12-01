import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        ...employee,
        salary: Number(employee.salary),
        date_of_joining: new Date(employee.date_of_joining).toISOString()
      };
      await api.post('/employees', employeeData);
      navigate('/employees'); // Navigate to employee list after adding
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees'); // Cancel and navigate back
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" name="first_name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Last Name" name="last_name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Position" name="position" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Salary" name="salary" type="number" fullWidth margin="normal" onChange={handleChange} />
        <TextField
          label="Date of Joining"
          name="date_of_joining"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField label="Department" name="department" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployee;
