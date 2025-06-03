import React from 'react';
import { Container, Typography, Paper, Grid, Card, CardContent, CardHeader, Box } from '@mui/material';

interface ManagerData {
  id: string;
  name: string;
  title: string;
  department: string;
  teamSize: number;
}

const Management: React.FC = () => {
  // Mock data for managers
  const managers: ManagerData[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Engineering Manager',
      department: 'Engineering',
      teamSize: 12
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Product Manager',
      department: 'Product',
      teamSize: 8
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Marketing Director',
      department: 'Marketing',
      teamSize: 6
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'HR Manager',
      department: 'Human Resources',
      teamSize: 4
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Management
      </Typography>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Management Team Overview
        </Typography>
        
        <Grid container spacing={3}>
          {managers.map((manager) => (
            <Grid size={{ xs: 12, md: 3, sm: 6 }} key={manager.id}>
              <Card>
                <CardHeader
                  title={manager.name}
                  subheader={manager.title}
                />
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Department
                    </Typography>
                    <Typography variant="body1">
                      {manager.department}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Team Size
                    </Typography>
                    <Typography variant="body1">
                      {manager.teamSize} members
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Management;