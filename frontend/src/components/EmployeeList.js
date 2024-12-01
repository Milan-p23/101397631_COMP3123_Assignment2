import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Employee List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/add-employee"
        sx={{ mb: 2, mr: 2 }}
      >
        Add Employee
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/search-employees')}
        sx={{ mb: 2 }}
      >
        Search Employees
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>{emp.first_name}</TableCell>
                <TableCell>{emp.last_name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/edit-employee/${emp._id}`}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(emp._id)}
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/view-employee/${emp._id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
