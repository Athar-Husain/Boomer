// src/pages/Coupons.js

import React, { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { CheckCircle, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

// Import the Dialog Components
import CheckCoupons from './CheckCoupons';
import SendCoupons from './SendCoupons';

// Styled Components for Buttons
const RoundButton = styled(Button)(({ theme }) => ({
    width: 150,
    height: 150,
    borderRadius: '50%',
    fontSize: '16px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textTransform: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    margin: '20px auto',
}));

const Coupons = () => {
    const [openCheckDialog, setOpenCheckDialog] = useState(false);
    const [openSendDialog, setOpenSendDialog] = useState(false);

    const handleOpenCheckDialog = () => setOpenCheckDialog(true);
    const handleCloseCheckDialog = () => setOpenCheckDialog(false);

    const handleOpenSendDialog = () => setOpenSendDialog(true);
    const handleCloseSendDialog = () => setOpenSendDialog(false);

    return (
        <MainCard title="Coupons Dashboard">
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                {/* Left Section with Round Buttons */}
                <Grid item xs={6} container direction="column" alignItems="center" spacing={3}>
                    {/* <Grid item>
                        <RoundButton onClick={handleOpenCheckDialog}>
                            <CheckCircle style={{ fontSize: '60px' }} />
                            <Typography variant="h6">Check</Typography>
                        </RoundButton>
                    </Grid>
                    <Grid item>
                        <RoundButton onClick={handleOpenSendDialog}>
                            <Send style={{ fontSize: '60px' }} />
                            <Typography variant="h6">Send Coupons</Typography>
                        </RoundButton>
                    </Grid> */}
                    <SendCoupons />
                </Grid>

                {/* Right Section */}
                <Grid item xs={6} container direction="column" justifyContent="center">
                    {/* <Typography variant="h4" color="textSecondary" align="center">
                        Manage Your Coupons
                    </Typography> */}

                    <CheckCoupons />


                </Grid>
            </Grid>

            {/* Dialogs */}
            {/* <CheckCoupons open={openCheckDialog} onClose={handleCloseCheckDialog} /> */}
            {/* <SendCoupons open={openSendDialog} onClose={handleCloseSendDialog} /> */}

        </MainCard>
    );
};

export default Coupons;
