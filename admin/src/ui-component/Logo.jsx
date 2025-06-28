// material-ui
import { useTheme } from '@mui/material/styles';
import logoImage from '../assets/images/logoheader.png';
// import logoImage from '../assets/images/logo1.jpg';

// ==============================|| LOGO COMPONENT ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <>

      <img
        src={logoImage}
        alt="Logo"
        style={{ width: '200px', maxWidth: '200px', marginTop: '0', marginLeft: '-16px', height: 'auto' }}
      />

      {/* <br /> */}

      {/* <h3>BOOMERANG</h3> */}
    </>
  );
};

export default Logo;
