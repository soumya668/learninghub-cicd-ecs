import React, { useEffect } from 'react';
import { Button, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  fetchUserById, 
  clearCurrentUser,
  selectCurrentUser, 
  selectUsersLoading, 
  selectUsersError 
} from '../../store/slices/usersSlice';

interface UserDetailsProps {
  userId: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUserById(userId));

    // Clean up when component unmounts
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  // Get the first user from the data array
  const userData = user;

  return (
    <Box>
      <Button 
        component={Link} 
        to="/users" 
        variant="outlined" 
        sx={{ mb: 2 }}
      >
        Back to Users
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {userData.name}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="subtitle1">Email</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="subtitle1">Username</Typography>
              <Typography variant="body1">{userData.username}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="subtitle1">Phone</Typography>
              <Typography variant="body1">{userData.phone || 'N/A'}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="subtitle1">Website</Typography>
              <Typography variant="body1">{userData.website || 'N/A'}</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <Typography variant="subtitle1">Company</Typography>
              <Typography variant="body1">{userData.company?.name || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetails;
