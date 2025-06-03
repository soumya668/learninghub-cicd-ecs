import React from 'react';
import { 
  Container, Typography, Paper, Grid, Card, CardContent, 
  CardMedia, Divider, List, ListItem, ListItemText, Box 
} from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8, sm: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              We are dedicated to providing innovative solutions that empower businesses to achieve their goals. 
              Our team of experts works tirelessly to deliver high-quality products and services that exceed expectations.
            </Typography>
            
            <Typography variant="body1">
              Founded in 2010, our company has grown from a small startup to a leading provider of technology solutions. 
              We believe in collaboration, innovation, and excellence in everything we do.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Innovation" 
                  secondary="We constantly seek new and better ways to solve problems and create value." 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Integrity" 
                  secondary="We are honest, transparent, and ethical in all our dealings." 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Excellence" 
                  secondary="We strive for excellence in everything we do, from product development to customer service." 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Collaboration" 
                  secondary="We believe in the power of teamwork and partnership to achieve great results." 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4, sm: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random/300x200/?office"
              alt="Office"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Address:</Typography>
                <Typography variant="body2">
                  123 Tech Street, Suite 456<br />
                  San Francisco, CA 94107
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Phone:</Typography>
                <Typography variant="body2">(123) 456-7890</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Email:</Typography>
                <Typography variant="body2">info@example.com</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2">Hours:</Typography>
                <Typography variant="body2">
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                  Saturday - Sunday: Closed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;