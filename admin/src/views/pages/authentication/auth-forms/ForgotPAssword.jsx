import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { headquarterForgotPassword } from 'redux/features/headQuarter/headquarterSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Form Values:', values);
    try {
      //   const response = await fetch('/api/headquarter/forgot-password', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ email: values.email })
      //   });
      const userData = {
        email: values.email
      };

      // dispatch(headquarterForgotPassword(userData));
      // setTimeout(() => navigate('/headquarter/resetpassword'), 3000);

      //   const data = await response.json();
      //   if (response.ok) {
      //     setEmailSent(true);
      //   } else {
      //     setErrors({ submit: data.message });
      //   }
      setSubmitting(false);
    } catch (err) {
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" align="center">
            Enter your email address, and we’ll send you a link to reset your password.
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {!emailSent ? (
              <>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-forgot">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-forgot"
                    type="text"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Send Reset Link
                    </Button>
                  </AnimateButton>
                </Box>
              </>
            ) : (
              <Typography variant="body1" align="center" color="success.main">
                Password reset email sent! Please check your inbox.
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
