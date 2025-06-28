import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import CouponService from './couponService';

const initialState = {
  allCoupons: [],
  dashboardSummary: null, // ⬅️ added
  isCouponError: false,
  isCouponSuccess: false,
  isCouponLoading: false,
  couponMessage: ''
};

export const createCoupon = createAsyncThunk('Coupons/createCoupon', async (userData, thunkAPI) => {
  try {
    return await CouponService.createCoupon(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllCoupons = createAsyncThunk('Coupons/getAllCoupons', async (_, thunkAPI) => {
  try {
    return await CouponService.getAllCoupons();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});
export const validateCoupon = createAsyncThunk('Coupons/validateCoupon', async (userData, thunkAPI) => {
  try {
    return await CouponService.validateCoupon(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCoupon = createAsyncThunk('Coupon/updateCoupon', async ({ id, updatedCoupon }, thunkAPI) => {
  try {
    return await CouponService.updateCoupon(id, updatedCoupon);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'Something went wrong';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDashboardSummary = createAsyncThunk('Coupons/getDashboardSummary', async (_, thunkAPI) => {
  try {
    return await CouponService.getDashboardSummary();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

const CouponSlice = createSlice({
  name: 'CouponSlice',
  initialState,
  reducers: {
    COUPON_RESET(state) {
      state.isCouponError = false;
      state.isCouponSuccess = false;
      state.isCouponLoading = false;
      state.couponMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.isCouponLoading = true;
        state.isCouponError = false;
        state.couponMessage = '';
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = false;
        state.isCouponSuccess = true;
        // state.memberdata = action.payload;
        toast.success('Coupon Created Succesfully');
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllCoupons.pending, (state) => {
        state.isCouponLoading = true;
        state.isCouponError = false;
        state.couponMessage = '';
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = false;
        state.isCouponSuccess = true;
        state.allCoupons = action.payload;
        // state.memberdata = action.payload;
        // toast.success('Coupon Created Succesfully');
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(validateCoupon.pending, (state) => {
        state.isCouponLoading = true;
        state.isCouponError = false;
        state.couponMessage = '';
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = false;
        state.isCouponSuccess = true;
        // state.allCoupons = action.payload;
        // state.memberdata = action.payload;
        toast.success('Coupon Created Succesfully');
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isCouponLoading = true;
        state.isCouponError = false;
        state.couponMessage = '';
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = false;
        state.isCouponSuccess = true;
        // state.allCoupons = action.payload;
        // state.memberdata = action.payload;
        toast.success('Coupon Updated Succesfully');
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(getDashboardSummary.pending, (state) => {
        state.isCouponLoading = true;
        state.isCouponError = false;
        state.couponMessage = '';
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = false;
        state.isCouponSuccess = true;
        console.log('action payload for getDashboardSummary', action.payload);
        state.dashboardSummary = action.payload; // ⬅️ Save data
      })
      .addCase(getDashboardSummary.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
        toast.error(action.payload);
      });
  }
});

export default CouponSlice.reducer;
