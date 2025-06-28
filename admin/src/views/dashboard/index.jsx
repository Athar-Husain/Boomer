import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


import { gridSpacing } from '../../redux/features/customization/customizationSlice';

import TopCouponsCard from './TopCouponsCard';
// import other cards when ready...
import { getDashboardSummary } from '../../redux/features/Coupons/couponSlice';


import CouponPieChart from './CouponPieChart';

import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import HourglassDisabledTwoToneIcon from '@mui/icons-material/HourglassDisabledTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardSummary, isCouponLoading } = useSelector((state) => state.Coupon);

  useEffect(() => {
    dispatch(getDashboardSummary());
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      {/* Cards Section */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TopCouponsCard
              isLoading={isCouponLoading}
              count={dashboardSummary?.totalCoupons ?? 0}
              title="Total Coupons Created"
              icon={StorefrontTwoToneIcon}
              bgColor="#1976d2"        // Blue
              iconBgColor="#1565c0"
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TopCouponsCard
              isLoading={isCouponLoading}
              count={dashboardSummary?.assignedCoupons ?? 0}
              title="Assigned Coupons"
              icon={AssignmentTurnedInTwoToneIcon}
              bgColor="#f57c00"        // Green
              // bgColor="#388e3c"        // Green
              // iconBgColor="#2e7d32"
              iconBgColor="#ef6c00"
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TopCouponsCard
              isLoading={isCouponLoading}
              count={dashboardSummary?.redeemedCoupons ?? 0}
              title="Redeemed Coupons"
              icon={RedeemTwoToneIcon}
              bgColor="#388e3c"        // Orange
              iconBgColor="#2e7d32"
              // iconBgColor="#ef6c00"
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TopCouponsCard
              isLoading={isCouponLoading}
              count={dashboardSummary?.expiredCoupons ?? 0}
              title="Expired Coupons"
              icon={HourglassDisabledTwoToneIcon}
              bgColor="#d32f2f"        // Red
              iconBgColor="#c62828"
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TopCouponsCard
              isLoading={isCouponLoading}
              count={dashboardSummary?.totalCustomers ?? 0}
              title="Total Customers"
              icon={StorefrontTwoToneIcon}
              bgColor="#7b1fa2"        // Purple
              iconBgColor="#6a1b9a"
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TopCouponsCard
              isLoading={isCouponLoading}
              count={dashboardSummary?.redemptionRate ?? 0}
              title="Redemption Rate"
              icon={AssignmentTurnedInTwoToneIcon}
              bgColor="#0288d1"        // Cyan
              iconBgColor="#0277bd"
            />
          </Grid>
        </Grid>

      </Grid>

      {/* Pie Chart Section */}
      <Grid item xs={12} md={6} lg={6}>
        <ChartContainer elevation={3}>
          <Typography variant="h6" gutterBottom>
            Coupon Distribution
          </Typography>
          {dashboardSummary && <CouponPieChart data={dashboardSummary} />}
        </ChartContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
