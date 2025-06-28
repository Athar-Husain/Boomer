import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerCoupons, assignCouponsToCustomer } from 'redux/features/Customers/customerSlice';

// import { assignCouponsToCustomer } from 'redux/features/Customers/customerSlice';
import { validateCoupon } from 'redux/features/Coupons/couponSlice';

const CheckCoupons2 = () => {
    const [showCoupons, setShowCoupons] = useState(false);

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { customersCoupons } = useSelector((state) => state.Customer);

    const onSubmit = async (data) => {
        const { phoneNumber } = data;
        setPhoneNumber(phoneNumber);
        setError('');
        setSuccessMessage('');

        setShowCoupons(false)
        await dispatch(getCustomerCoupons({ phoneNumber }));
        setShowCoupons(true)
    };

    const closedClick = async () => {
        setShowCoupons(false);
        setPhoneNumber('');
        reset();
        setSuccessMessage('');
        setError('');

    }

    const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

    const handleRedeemClick = (couponId) => {
        setSelectedCouponId(couponId);
        setOpenDialog(true);
    };

    const handleConfirmRedeem = async () => {
        if (!phoneNumber || !selectedCouponId) return;

        try {
            const response = await dispatch(validateCoupon({ phoneNumber, couponId: selectedCouponId }));

            if (response.payload?.message === "Coupon applied successfully") {
                setSuccessMessage('Coupon redeemed successfully!');

                // ✅ Assign the coupons to the customer after successful redemption
                dispatch(assignCouponsToCustomer({ phoneNumber, name }));

                // ✅ Refresh customer's coupons
                dispatch(getCustomerCoupons({ phoneNumber }));


                // ✅ Reset form fields
                reset();
            } else {
                setError(response.payload?.message || 'Failed to redeem the coupon.');
            }
        } catch (err) {
            setError('An error occurred while redeeming the coupon.');
        } finally {
            setOpenDialog(false);
            setSelectedCouponId(null);
        }
    };

    const handleCancelRedeem = () => {
        setOpenDialog(false);
        setSelectedCouponId(null);
    };

    const watchPhone = watch('phoneNumber');

    useEffect(() => {
        if (watchPhone !== phoneNumber) {
            setShowCoupons(false); // trigger action when watched input changes
        }
    }, [watchPhone]);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom>Search Coupons</Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
                <TextField
                    label="Enter phone number"
                    variant="outlined"
                    fullWidth
                    {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Phone number must be 10 digits'
                        }
                    })}
                    sx={{ mb: 2 }}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                />
                <Button variant="contained" color="primary" type="submit">Search Coupons</Button>
            </Box>

            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            {successMessage && <Typography color="success.main" sx={{ mb: 2 }}>{successMessage}</Typography>}

            {showCoupons && customersCoupons?.length > 0 ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                        <Button variant="outlined" color="secondary" onClick={() => closedClick()}>
                            Close
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Code</strong></TableCell>
                                    <TableCell><strong>Discount</strong></TableCell>
                                    <TableCell><strong>Min Order</strong></TableCell>
                                    <TableCell><strong>Expiry Date</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customersCoupons.map((coupon) => {
                                    const expired = isExpired(coupon.expiryDate);
                                    return (
                                        <TableRow key={coupon._id}>
                                            <TableCell>{coupon.couponCode}</TableCell>
                                            <TableCell>{coupon.discount}</TableCell>
                                            <TableCell>{coupon.minPurchase}</TableCell>
                                            <TableCell>{coupon.expiryDate.split('T')[0]}</TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                {!coupon.isConsidered ? (
                                                    <Typography color="text.secondary" fontWeight="bold">Not Considered</Typography>
                                                ) : expired ? (
                                                    <Typography color="error" fontWeight="bold">Expired</Typography>
                                                ) : (
                                                    <Typography color="success.main" fontWeight="bold">Active</Typography>
                                                )}
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell>
                                                {coupon.isRedeemed ? (
                                                    <Typography color="primary" fontWeight="bold">Already Redeemed</Typography>
                                                ) : !coupon.isConsidered ? (
                                                    <Typography color="text.secondary" fontWeight="bold">Not Applicable</Typography>
                                                ) : expired ? (
                                                    <Typography color="error" fontWeight="bold">Expired</Typography>
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => handleRedeemClick(coupon._id)}
                                                    >
                                                        Mark as Used
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <Typography>No coupons found for this phone number.</Typography>
            )}



            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCancelRedeem}>
                <DialogTitle>Confirm Redemption</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to redeem this coupon? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelRedeem} color="inherit">No</Button>
                    <Button onClick={handleConfirmRedeem} color="primary" autoFocus>
                        Yes, Redeem
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CheckCoupons2;
