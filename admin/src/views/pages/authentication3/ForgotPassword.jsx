import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import logo from '../../../assets/images/logoheader.png';
// import logo from '../../../assets/images/logo1.jpg';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { HQRESET } from 'redux/features/headQuarter/headquarterSlice';
import ForgotPassword1 from '../authentication/auth-forms/ForgotPAssword';

// ================================|| AUTH3 - LOGIN ||================================ //

const ForgotPassword = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isHqLoading, isHqLoggedIn, HQAdmin, isHqSuccess, isError } = useSelector((state) => state.headquarter);

  // Get the token from localStorage or cookies (assuming it is stored there)

  // useEffect(() => {
  //   // Check if the user is already logged in and has a valid token
  //   if (token && isHqLoggedIn && isHqSuccess && HQAdmin !== null) {
  //     navigate('/'); // Redirect to the dashboard
  //   } else if (token && !isHqLoggedIn) {
  //     // Optionally, if token is present but not logged in, navigate elsewhere or show a message
  //     // For now, no redirection to login if token exists, since you have `isHqLoggedIn` checking the status
  //   }
  //   // Reset state if needed, on unsuccessful login attempt
  //   dispatch(HQRESET());
  // }, [token, isHqLoggedIn, isHqSuccess, HQAdmin, navigate, dispatch, isError]);

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <img src={logo} alt="" style={{ width: '200px', height: '200px' }} />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Headquarter Login
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ForgotPassword1 />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
              <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link to="/headquarter/register" style={{ textDecoration: 'none' }}>
                  Register
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default ForgotPassword;
