import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

// redux imports
import { drawerWidth } from '../../redux/features/customization/customizationSlice';
import { set_Menu } from '../../redux/features/customization/customizationSlice';

// assets
import { IconChevronRight } from '@tabler/icons-react';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20), // Adjusted with drawerWidth
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px',
  },
}));

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();


  const handleLeftDrawerToggle = () => {
    dispatch(set_Menu(!leftDrawerOpened));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* Main Content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator={IconChevronRight} icon title rightAlign />
        <Outlet />
      </Main>

      {/* Customization settings */}
      <Customization />
    </Box>
  );
};

export default MainLayout;
