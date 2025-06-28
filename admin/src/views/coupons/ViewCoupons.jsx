import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Box, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
    createCoupon, getAllCoupons,
    updateCoupon,
    //  updateCoupon 
} from 'redux/features/Coupons/couponSlice';

const ViewCoupons = () => {
    const dispatch = useDispatch();
    const { allCoupons } = useSelector((state) => state.Coupon);

    useEffect(() => {
        dispatch(getAllCoupons());
    }, [dispatch]);

    // const [coupons, setCoupons] = useState(allCoupons); // Use allCoupons from the Redux store
    const [openModal, setOpenModal] = useState(false);
    const [currentCoupon, setCurrentCoupon] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            code: '',
            discount: '',
            minPurchase: '',
            expiresIn: '',
        },
    });

    const handleCreateCoupon = async (data) => {
        if (allCoupons.length >= 3) {
            alert('You can only create a maximum of 3 coupons');
            return;
        }

        try {
            setLoading(true);

            const newCoupon = {
                couponCode: data.code.toUpperCase(),
                discount: data.discount,
                minPurchase: data.minPurchase,
                expiresIn: data.expiresIn,
            };

            // setCoupons([...coupons, newCoupon]);
            dispatch(createCoupon(newCoupon));
            setOpenModal(false);
            setLoading(false);
            await dispatch(getAllCoupons());
            reset(); // Reset form values after submission
        } catch (error) {
            setLoading(false);
            console.log("Error while submitting", error);
        }
    };

    // const handleEditCoupon = (couponCode) => {
    //     // Find the coupon in the allCoupons list by couponCode
    //     const couponToEdit = allCoupons.find(coupon => coupon.couponCode === couponCode);

    //     if (couponToEdit) {
    //         setCurrentCoupon(couponToEdit); // Set the coupon data to currentCoupon
    //         setOpenEditModal(true); // Open the edit modal
    //     }
    // };

    const handleEditCoupon = (couponCode) => {
        const couponToEdit = allCoupons.find(coupon => coupon.couponCode === couponCode);

        if (couponToEdit) {
            setCurrentCoupon(couponToEdit);
            reset({
                code: couponToEdit.couponCode,
                discount: couponToEdit.discount,
                minPurchase: couponToEdit.minPurchase,
                expiresIn: couponToEdit.expiresIn,
            });
            setOpenEditModal(true);
        }
    };



    const handleUpdateCoupon = async (data) => {
        try {
            setLoading(true);

            const updatedCoupon = {
                ...currentCoupon,
                couponCode: data.code.toUpperCase(),
                discount: data.discount,
                minPurchase: data.minPurchase,
                expiresIn: data.expiresIn,
            };
            const id = currentCoupon._id;

            await dispatch(updateCoupon({ id, updatedCoupon })).unwrap();

            // await dispatch(updateCoupon(updatedCoupon)); // Update coupon via dispatch
            // setCoupons(coupons.map(c => (c.couponCode === currentCoupon.couponCode ? updatedCoupon : c))); // Update local state


            setLoading(false);
            setOpenEditModal(false);
            await dispatch(getAllCoupons()); // Fetch updated coupons
            reset(); // Reset form values after submission
        } catch (error) {
            setLoading(false);
            console.log("Error while updating", error);
        }
    };

    return (
        <div style={{ padding: '30px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
            {/* Conditionally render the "Create Coupon" button */}
            {allCoupons.length < 3 && (
                <Box textAlign="center" mb={4}>
                    <Button
                        variant="contained"
                        onClick={() => setOpenModal(true)}
                        sx={{
                            backgroundColor: '#6200ea',
                            '&:hover': { backgroundColor: '#3700b3' },
                            color: '#fff',
                            padding: '12px 28px',
                            fontSize: '16px',
                            borderRadius: '30px',
                        }}
                    >
                        Create Coupon
                    </Button>
                </Box>
            )}

            {/* Show Coupons */}
            {allCoupons.length > 0 ? (
                <Grid container spacing={4}>
                    {allCoupons.map((coupon) => (
                        <Grid item xs={12} sm={6} md={4} key={coupon.couponCode}>
                            <Card
                                sx={{
                                    boxShadow: 10,
                                    borderRadius: '16px',
                                    padding: '24px',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&:active': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                                    }
                                }}


                            // className='hover-underline'
                            >
                                <CardContent>
                                    <Typography variant="h2" sx={{
                                        fontWeight: 'bold',
                                        color: '#6200ea',
                                        marginBottom: '12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {coupon.couponCode}
                                    </Typography>
                                    <Typography variant="body1" sx={{
                                        color: '#333',
                                        fontSize: '18px',
                                        marginBottom: '16px',
                                        lineHeight: '3'
                                    }}>
                                        Discount: <strong>{coupon.discount}%</strong><br />
                                        Min Purchase: <strong> ${coupon.minPurchase}</strong><br />
                                        <i>Expires In : </i><strong>{coupon.expiresIn} days</strong>
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditCoupon(coupon.couponCode)}
                                        sx={{
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                            transition: 'transform 0.2s ease, background-color 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#3700b3',
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>


            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '24px', color: '#888' }}>
                    No coupons available. Create one now!
                </Typography>
            )}

            {/* Create Coupon Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
                <DialogTitle sx={{ backgroundColor: '#6200ea', color: '#fff', textAlign: 'center', padding: '16px' }}>
                    Create Coupon
                </DialogTitle>
                <DialogContent sx={{ padding: '24px' }}>
                    <form onSubmit={handleSubmit(handleCreateCoupon)}>
                        {/* Coupon Code */}
                        <Controller
                            name="code"
                            control={control}
                            rules={{ required: 'Coupon code is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Coupon Code"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: '16px', marginTop: "20px" }}
                                    error={!!errors.code}
                                    helperText={errors.code?.message}
                                />
                            )}
                        />
                        {/* Discount */}
                        <Controller
                            name="discount"
                            control={control}
                            rules={{
                                required: 'Discount is required',
                                valueAsNumber: true, // Ensure it's treated as a number
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Discount (%)"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: '16px' }}
                                    error={!!errors.discount}
                                    helperText={errors.discount?.message}
                                />
                            )}
                        />
                        {/* Min Purchase */}
                        <Controller
                            name="minPurchase"
                            control={control}
                            rules={{
                                required: 'Min purchase is required',
                                valueAsNumber: true, // Ensure it's treated as a number
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Min Purchase ($)"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: '16px' }}
                                    error={!!errors.minPurchase}
                                    helperText={errors.minPurchase?.message}
                                />
                            )}
                        />
                        {/* Expires In */}
                        <FormControl fullWidth sx={{ marginBottom: '16px' }} error={!!errors.expiresIn}>
                            <InputLabel>Expires In (Days)</InputLabel>
                            <Controller
                                name="expiresIn"
                                control={control}
                                rules={{ required: 'Expiry duration is required' }}
                                render={({ field }) => (
                                    <Select {...field} label="Expires In (Days)">
                                        <MenuItem value={10}>10 Days</MenuItem>
                                        <MenuItem value={20}>20 Days</MenuItem>
                                        <MenuItem value={30}>30 Days</MenuItem>
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.expiresIn?.message}</FormHelperText>
                        </FormControl>

                        <DialogActions sx={{ justifyContent: 'space-between', padding: '12px 24px' }}>
                            <Button onClick={() => setOpenModal(false)} color="secondary" sx={{ borderRadius: '20px' }}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#6200ea',
                                    color: 'white',
                                    borderRadius: '20px',
                                    '&:hover': { backgroundColor: '#3700b3' }
                                }}
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Coupon'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Coupon Modal */}
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth>
                <DialogTitle sx={{ backgroundColor: '#6200ea', color: '#fff', textAlign: 'center', padding: '16px' }}>
                    Edit Coupon
                </DialogTitle>
                <DialogContent sx={{ padding: '24px' }}>
                    {currentCoupon && (
                        <form onSubmit={handleSubmit(handleUpdateCoupon)}>
                            {/* Coupon Code */}
                            <Controller
                                name="code"
                                control={control}
                                // defaultValue={currentCoupon.couponCode} // Pre-fill the coupon code from currentCoupon
                                rules={{ required: 'Coupon code is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Coupon Code"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: '16px', marginTop: "20px" }}
                                        error={!!errors.code}
                                        helperText={errors.code?.message}
                                    />
                                )}
                            />
                            {/* Discount */}
                            <Controller
                                name="discount"
                                control={control}
                                // defaultValue={currentCoupon.discount} // Pre-fill the discount from currentCoupon
                                rules={{
                                    required: 'Discount is required',
                                    valueAsNumber: true,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Discount (%)"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: '16px' }}
                                        error={!!errors.discount}
                                        helperText={errors.discount?.message}
                                    />
                                )}
                            />
                            {/* Min Purchase */}
                            <Controller
                                name="minPurchase"
                                control={control}
                                // defaultValue={currentCoupon.minPurchase} // Pre-fill the minPurchase from currentCoupon
                                rules={{
                                    required: 'Min purchase is required',
                                    valueAsNumber: true,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Min Purchase ($)"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: '16px' }}
                                        error={!!errors.minPurchase}
                                        helperText={errors.minPurchase?.message}
                                    />
                                )}
                            />
                            {/* Expires In */}
                            <FormControl fullWidth sx={{ marginBottom: '16px' }} error={!!errors.expiresIn}>
                                <InputLabel>Expires In (Days)</InputLabel>
                                <Controller
                                    name="expiresIn"
                                    control={control}
                                    // defaultValue={currentCoupon.expiresIn} // Pre-fill the expiresIn from currentCoupon
                                    rules={{ required: 'Expiry duration is required' }}
                                    render={({ field }) => (
                                        <Select {...field} label="Expires In (Days)">
                                            <MenuItem value={10}>10 Days</MenuItem>
                                            <MenuItem value={20}>20 Days</MenuItem>
                                            <MenuItem value={30}>30 Days</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.expiresIn?.message}</FormHelperText>
                            </FormControl>

                            <DialogActions sx={{ justifyContent: 'space-between', padding: '12px 24px' }}>
                                <Button onClick={() => setOpenEditModal(false)} color="secondary" sx={{ borderRadius: '20px' }}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: '#6200ea',
                                        color: 'white',
                                        borderRadius: '20px',
                                        '&:hover': { backgroundColor: '#3700b3' }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Update Coupon'}
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default ViewCoupons;
