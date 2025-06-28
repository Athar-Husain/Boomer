import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { headquarterResetPassword } from '../../../../redux/features/headQuarter/headquarterSlice';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await dispatch(headquarterResetPassword({ password, token }));
      setMessage('Password successfully reset!');
      setTimeout(() => navigate('/headquarter/login'), 3000); // Redirect after success
    } catch (error) {
      console.log('error in reset password', error.message);
      setMessage('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f4f6f9',
        padding: 2
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Reset Password
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400
        }}
      >
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
        </Button>

        {message && (
          <Typography variant="body2" color={message.includes('successfully') ? 'green' : 'red'} textAlign="center">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ResetPassword;
