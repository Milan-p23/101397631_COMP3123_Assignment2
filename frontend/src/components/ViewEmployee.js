import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import api from '../utils/api';

const ViewEmployee = () => {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);

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

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        View Employee Details
      </Typography>
      <Typography variant="body1">
        <strong>First Name:</strong> {employee.first_name}
      </Typography>
      <Typography variant="body1">
        <strong>Last Name:</strong> {employee.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {employee.email}
      </Typography>
      <Typography variant="body1">
        <strong>Department:</strong> {employee.department}
      </Typography>
      <Typography variant="body1">
        <strong>Position:</strong> {employee.position}
      </Typography>
    </Box>
  );
};

export default ViewEmployee;
