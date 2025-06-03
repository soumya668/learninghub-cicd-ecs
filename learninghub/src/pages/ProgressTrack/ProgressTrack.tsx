import React from 'react';
import { 
  Container, Typography, Paper, Grid, Card, CardContent, 
  LinearProgress, Box, Divider 
} from '@mui/material';

interface ProgressData {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
}

const ProgressTrack: React.FC = () => {
  // Mock data for progress tracking
  const progressItems: ProgressData[] = [
    {
      id: '1',
      title: 'Frontend Development',
      description: 'Implement user interface components using React',
      progress: 75,
      startDate: '2023-01-15',
      endDate: '2023-03-30',
      status: 'In Progress'
    },
    {
      id: '2',
      title: 'Backend API Development',
      description: 'Create RESTful API endpoints for data access',
      progress: 90,
      startDate: '2023-01-10',
      endDate: '2023-03-15',
      status: 'In Progress'
    },
    {
      id: '3',
      title: 'Database Design',
      description: 'Design and implement database schema',
      progress: 100,
      startDate: '2023-01-05',
      endDate: '2023-02-28',
      status: 'Completed'
    },
    {
      id: '4',
      title: 'User Testing',
      description: 'Conduct user acceptance testing',
      progress: 0,
      startDate: '2023-04-01',
      endDate: '2023-04-30',
      status: 'Not Started'
    }
  ];

  // Helper function to get color based on status
  const getStatusColor = (status: ProgressData['status']) => {
    switch (status) {
      case 'Completed': return 'success.main';
      case 'In Progress': return 'info.main';
      case 'Delayed': return 'error.main';
      default: return 'text.secondary';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Progress Tracking
      </Typography>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Project Progress Overview
        </Typography>
        
        <Grid container spacing={3}>
          {progressItems.map((item) => (
            <Grid size={{xs: 12}} key={item.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getStatusColor(item.status),
                        fontWeight: 'bold'
                      }}
                    >
                      {item.status}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.progress} 
                        color={
                          item.progress === 100 ? 'success' : 
                          item.progress > 50 ? 'primary' : 
                          item.progress > 0 ? 'info' : 'warning'
                        }
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {`${Math.round(item.progress)}%`}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Start: {item.startDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      End: {item.endDate}
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

export default ProgressTrack;