import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import AdminService from './adminService';

// import { toast } from 'react-toastify';

const initialState = {
  Admin: null,
  isSuccess: false,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  message: ''
};

const token = localStorage.getItem('token');
if (token) {
  initialState.isLoggedIn = true;
} else {
  initialState.isLoggedIn = false;
}

export const AdminRegister = createAsyncThunk('Admin/AdminRegister', async (userData, thunkAPI) => {
  try {
    return await AdminService.AdminRegister(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const AdminLogin = createAsyncThunk('Admin/AdminLogin', async (userData, thunkAPI) => {
  try {
    return await AdminService.AdminLogin(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || 'An unexpected error occurred';
    return thunkAPI.rejectWithValue(message);
  }
});

export const AdminLogout = createAsyncThunk('Admin/AdminLogout', async (_, thunkAPI) => {
  try {
    return await AdminService.AdminLogout();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAdminLoginStatus = createAsyncThunk('Admin/getAdminLoginStatus', async (_, thunkAPI) => {
  try {
    // console.log('in service getHeadquarterLoginStatus');
    return await AdminService.getAdminLoginStatus();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAdmin = createAsyncThunk('Admin/getAdmin', async (_, thunkAPI) => {
  try {
    return await AdminService.getAdmin();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const AdminSlice = createSlice({
  name: 'AdminSlice',
  initialState,
  reducers: {
    ADRESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(AdminRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.memberdata = action.payload;
        toast.success('Register Succesfully');
      })
      .addCase(AdminRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(AdminLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.Admin = action.payload;
        // state.memberdata = action.payload;
        // toast.success('Login Successfully');
        toast.success('Login Successfully', {
          position: 'top-center' // Position the toast at the top center
        });
      })
      .addCase(AdminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(AdminLogout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(AdminLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.Admin = null;
        // state.memberdata = action.payload;
        toast.warn('Logout Successfully', {
          position: 'top-center' // Position the toast at the top center
        });
      })
      .addCase(AdminLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.Admin = action.payload;
        // state.memberdata = action.payload;
        // toast.success('Logout Successfully', {
        //   position: 'top-center' // Position the toast at the top center
        // });
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload, {
          position: 'top-center' // Position the toast at the top center
        });
      })
      .addCase(getAdminLoginStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAdminLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        // console.log('getAdminLoginStatus', action.payload);
        // state.Admin= (action.payload)
        // toast.success('User LoggeIn ');
      })
      .addCase(getAdminLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // Show the error message in a toast notification

        if (action.payload.includes('jwt expired')) {
          state.isLoggedIn = false;
          localStorage.removeItem('token');
          toast.info('Session Expires Please Login', {
            position: 'top-center' // Position the toast at the top center
          });
        }

        // Check if the error message is "jwt expired" and update isLoggedIn accordingly
        // if (action.payload === 'jwt expired') {
        //   state.isLoggedIn = false;
        // }
      });
  }
});

export const { ADRESET } = AdminSlice.actions;
export default AdminSlice.reducer;
