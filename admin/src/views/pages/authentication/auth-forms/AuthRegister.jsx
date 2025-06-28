import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { headquarterRegister } from '../../../../redux/features/headQuarter/headquarterSlice';
import { AdminRegister } from 'redux/features/Admin/adminSlice';

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  // const { isHqLoading, isHqLoggedIn, HQAdmin, isHqSuccess, isError } = useSelector((state) => state.headquarter);

  const { isLoading, isLoggedIn, Admin, isSuccess, isError } = useSelector((state) => state.Admin);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            {/* <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button> */}
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          userId: '',
          email: '',
          mobile: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().required('User ID is required'),
          email: Yup.string().email('Must be a valid email').required('Email is required'),
          mobile: Yup.string().required('Mobile number is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            // dispatch(headquarterRegister(values));
            dispatch(AdminRegister(values));
            // if (isSuccess) {
            navigate('/login')

            // }

            setSubmitting(false);
          }, 500);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <TextField
              fullWidth
              label="User ID"
              margin="normal"
              name="userId"
              value={values.userId}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.userId && errors.userId)}
              helperText={touched.userId && errors.userId}
              sx={{ ...theme.typography.customInput }}
            />

            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{ ...theme.typography.customInput }}
            />

            <TextField
              fullWidth
              label="Mobile Number"
              margin="normal"
              name="mobile"
              value={values.mobile}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.mobile && errors.mobile)}
              helperText={touched.mobile && errors.mobile}
              sx={{ ...theme.typography.customInput }}
            />

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>

            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
              label={
                <Typography variant="subtitle1">
                  Agree with &nbsp;
                  <Typography variant="subtitle1" component={Link} to="#">
                    Terms & Conditions
                  </Typography>
                </Typography>
              }
            />

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign Up
                </Button>
              </AnimateButton>
            </Box>

            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
              Already ! have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </Typography>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
