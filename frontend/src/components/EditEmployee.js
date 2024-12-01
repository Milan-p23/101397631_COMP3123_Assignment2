import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import api from '../utils/api';

const EditEmployee = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employees/${id}`, employee);
      navigate('/employees'); // Redirect after editing
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees'); // Cancel and navigate back
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" name="first_name" fullWidth margin="normal" value={employee.first_name} onChange={handleChange} />
        <TextField label="Last Name" name="last_name" fullWidth margin="normal" value={employee.last_name} onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" value={employee.email} onChange={handleChange} />
        <TextField label="Position" name="position" fullWidth margin="normal" value={employee.position} onChange={handleChange} />
        <TextField label="Salary" name="salary" type="number" fullWidth margin="normal" value={employee.salary} onChange={handleChange} />
        <TextField
          label="Date of Joining"
          name="date_of_joining"
          type="date"
          fullWidth
          margin="normal"
          value={employee.date_of_joining.split('T')[0]}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField label="Department" name="department" fullWidth margin="normal" value={employee.department} onChange={handleChange} />
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

export default EditEmployee;
