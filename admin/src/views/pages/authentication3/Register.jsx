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
import logo from '../../../assets/images/logo1.jpg';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { HQRESET } from 'redux/features/headQuarter/headquarterSlice';
import { ADRESET } from 'redux/features/Admin/adminSlice';
import AuthRegister from '../authentication/auth-forms/AuthRegister';

// ================================|| AUTH3 - LOGIN ||================================ //



const Register = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { isLoading, isLoggedIn, Admin, isSuccess, isError } = useSelector((state) => state.Admin);

  useEffect(() => {
    if (isSuccess && isLoggedIn && Admin !== null) {
      navigate('/');
    }
    dispatch(ADRESET());
  }, [isLoggedIn, isSuccess, isLoading, dispatch, navigate, isError]);

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 2 }}>
                    <Link to="#" aria-label="logo">
                      <img src={logo} alt="" style={{ width: '200px', height: '200px' }} />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Admin register dd
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
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

export default Register;
