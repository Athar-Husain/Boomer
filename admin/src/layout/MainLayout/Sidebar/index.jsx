import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

import MenuList from './MenuList'; // Adjust this import based on your file structure
import LogoSection from '../LogoSection'; // Adjust this import based on your file structure
import Chip from 'ui-component/extended/Chip'; // Adjust this import based on your file structure

import { drawerWidth } from '../../../redux/features/customization/customizationSlice'; // Adjust this import

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      {/* Logo section visible only on mobile view */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>

      {/* Menu list and version info */}
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={import.meta.env.VITE_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={import.meta.env.VITE_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle} // Toggles the drawer when clicking outside or swiping
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
