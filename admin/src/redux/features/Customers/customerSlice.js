import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import CustomerService from './customerService';

const initialState = {
  customersCoupons: [],
  allCustomers: [],
  NoCouponsCustomers: [],

  isCustomerError: false,
  isCustomerSuccess: false,
  isCustomerLoading: false,
  customerMessage: ''
};

export const assignCouponsToCustomer = createAsyncThunk('Customer/assignCouponsToCustomer', async (userData, thunkAPI) => {
  try {
    return await CustomerService.assignCouponsToCustomer(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCustomer = createAsyncThunk('Customer/updateCustomer', async (userData, thunkAPI) => {
  try {
    return await CustomerService.updateCustomer(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

// export const getCustomerCoupons = createAsyncThunk('Customer/getCustomerCoupons', async (userData, thunkAPI) => {
//   try {
//     return await CustomerServie.getCustomerCoupons(userData);
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const getCustomerCoupons = createAsyncThunk('Customer/getCustomerCoupons', async (userData, thunkAPI) => {
  try {
    return await CustomerService.getCustomerCoupons(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllCustomers = createAsyncThunk('Customer/getAllCustomers', async (_, thunkAPI) => {
  try {
    return await CustomerService.getAllCustomers();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCustomersWithNoCoupons = createAsyncThunk('Customer/getCustomersWithNoCoupons', async (_, thunkAPI) => {
  try {
    return await CustomerService.getCustomersWithNoCoupons();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

const CustomerSlice = createSlice({
  name: 'CustomerSlice',
  initialState,
  reducers: {
    CUSTOMER_RESET(state) {
      state.isCustomerError = false;
      state.customersCoupons = [];
      state.isCustomerSuccess = false;
      state.isCustomerLoading = false;
      state.customerMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignCouponsToCustomer.pending, (state) => {
        state.isCouponLoading = true;
        state.isCustomerError = false;
        state.customerMessage = '';
      })
      .addCase(assignCouponsToCustomer.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = false;
        state.isCustomerSuccess = true;
        // state.memberdata = action.payload;
        toast.success('Coupon Sent Succesfully');
      })
      .addCase(assignCouponsToCustomer.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = true;
        state.customerMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCustomerCoupons.pending, (state) => {
        state.isCouponLoading = true;
        state.isCustomerError = false;
        state.customerMessage = '';
      })
      .addCase(getCustomerCoupons.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = false;
        state.isCustomerSuccess = true;
        state.customersCoupons = action.payload;
        if (action.payload.length == 0) {
          state.customersCoupons = [];
          toast.warning('No Coupons Found');
        }
        if (action.payload.length !== 0) {
          toast.success('Coupons Found');
        }
      })
      .addCase(getCustomerCoupons.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = true;
        state.customerMessage = action.payload;
        state.customersCoupons = [];
        toast.error(action.payload);
      })
      .addCase(getAllCustomers.pending, (state) => {
        state.isCouponLoading = true;
        state.isCustomerError = false;
        state.customerMessage = '';
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = false;
        state.isCustomerSuccess = true;
        state.allCustomers = action.payload;
        // toast.success('Coupon Sent Succesfully');
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = true;
        state.customerMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCustomersWithNoCoupons.pending, (state) => {
        state.isCouponLoading = true;
        state.isCustomerError = false;
        state.customerMessage = '';
      })
      .addCase(getCustomersWithNoCoupons.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = false;
        state.isCustomerSuccess = true;
        state.NoCouponsCustomers = action.payload;
        // toast.success('Coupon Sent Succesfully');
      })
      .addCase(getCustomersWithNoCoupons.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = true;
        state.customerMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isCouponLoading = true;
        state.isCustomerError = false;
        state.customerMessage = '';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = false;
        state.isCustomerSuccess = true;
        // state.memberdata = action.payload;
        toast.success('Customer Updated Succesfully');
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCustomerError = true;
        state.customerMessage = action.payload;
        toast.error(action.payload);
      });
  }
});

export default CustomerSlice.reducer;
