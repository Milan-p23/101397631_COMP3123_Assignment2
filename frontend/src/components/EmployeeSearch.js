import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Alert } from '@mui/material';
import api from '../utils/api';

const EmployeeSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState({ name: '', department: '', position: '' });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setError(null); // Reset error
    setNoResults(false); // Reset no results

    try {
      const response = await api.get('/employees/search', { params: searchCriteria });
      setEmployees(response.data);
      if (response.data.length === 0) setNoResults(true);
    } catch (err) {
      if (err.response?.status === 404) {
        setNoResults(true);
      } else {
        setError(err.response?.data?.message || 'Error searching employees');
      }
      setEmployees([]);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee Search
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Department"
          name="department"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Position"
          name="position"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {noResults && <Alert severity="info" sx={{ marginBottom: 2 }}>No matching employees found.</Alert>}

      {employees.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default EmployeeSearch;
