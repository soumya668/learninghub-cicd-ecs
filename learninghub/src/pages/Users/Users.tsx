import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

const Users: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This would be replaced with actual data fetching logic
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [userId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {userId ? 'User Details' : 'Users'}
      </Typography>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <Grid container justifyContent="center" sx={{ py: 3 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {userId ? <UserDetails userId={userId} /> : <UsersList />}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Users;