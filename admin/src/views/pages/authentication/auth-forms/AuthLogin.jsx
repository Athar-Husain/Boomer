import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { AdminLogin } from 'redux/features/Admin/adminSlice';

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // This useEffect hook will ensure that the action is dispatched after the component has rendered.
  const handleLoginSubmit = (values, setSubmitting, setErrors) => {
    const userData = {
      userId: values.userId,
      password: values.password
    };

    // Dispatch the login action inside an effect or after the render phase
    dispatch(AdminLogin(userData));
    setSubmitting(false);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          userId: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().max(255).required('User Id is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await handleLoginSubmit(values, setSubmitting, setErrors);
          } catch (err) {
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.userId && errors.userId)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-userId-login">User Id</InputLabel>
              <OutlinedInput
                id="outlined-adornment-userId-login"
                type="text"
                value={values.userId}
                name="userId"
                onBlur={handleBlur}
                onChange={handleChange}
                label="User Id"
              />
              {touched.userId && errors.userId && (
                <FormHelperText error id="standard-weight-helper-text-userId-login">
                  {errors.userId}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
                label="Remember me"
              />
              {/* <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                <Link to="/headquarter/forgotpassword" style={{ textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
              </Typography> */}
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Login
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
