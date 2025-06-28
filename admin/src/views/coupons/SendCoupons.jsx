import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { assignCouponsToCustomer } from 'redux/features/Customers/customerSlice';
import { toast } from 'react-toastify';

const SendCoupons = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { isCustomerLoading } = useSelector((state) => state.Customer);

  const onSubmit = async (data) => {
    const { phoneNumber, name } = data;

    try {
      const response = await dispatch(assignCouponsToCustomer({ phoneNumber, name }));

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`Coupons sent to ${phoneNumber}`);
        reset();
      }
    } catch (error) {
      // console.error('Error dispatching action:', error);
      // toast.error('An error occurred while sending coupons.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Send  Coupons
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits"
            }
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <TextField
          label="Customer Name (Optional)"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          {...register("name")}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isCustomerLoading}
            startIcon={isCustomerLoading && <CircularProgress size={20} />}
          >
            {isCustomerLoading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SendCoupons;
