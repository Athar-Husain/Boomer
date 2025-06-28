import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

const TotalCouponsCard = ({ isLoading, count }) => {
  const theme = useTheme();

  return isLoading ? (
    <SkeletonEarningCard />
  ) : (
    <MainCard
      border={false}
      content={false}
      sx={{
        bgcolor: '#556cd6',
        color: '#fff',
        overflow: 'hidden',
        boxShadow: theme.shadows[3], // subtle elevation
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[6]
        },
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 150,
          height: 150,
          background: '#388eff',
          borderRadius: '50%',
          top: { xs: -105, sm: -85 },
          right: { xs: -140, sm: -95 }
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          width: 150,
          height: 150,
          background: '#2c387e',
          borderRadius: '50%',
          top: { xs: -155, sm: -125 },
          right: { xs: -70, sm: -15 },
          opacity: 0.5
        }
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Grid container alignItems="center" spacing={2}>
          {/* Left: Icon */}
          <Grid item>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                background: '#3f51b5',
                color: '#fff'
              }}
            >
              <StorefrontTwoToneIcon fontSize="medium" />
            </Avatar>
          </Grid>

          {/* Right: Count and Text (stacked) */}
          <Grid item xs>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600
                  }}
                >
                  {count}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    color: 'primary'
                  }}
                >
                  Total Coupons Created
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

TotalCouponsCard.propTypes = {
  isLoading: PropTypes.bool,
  count: PropTypes.number
};

export default TotalCouponsCard;
