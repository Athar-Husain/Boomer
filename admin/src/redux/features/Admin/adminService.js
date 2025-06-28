import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

const ADMIN_URL = `${BASE_API_URL}/api/admin/`;

const token = localStorage.getItem('token');

if (!token) {
  localStorage.removeItem('token');
}


const AdminRegister = async (userData) => {
  try {
    const response = await axios.post(ADMIN_URL + 'AdminRegister', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AdminLogin = async (userData) => {
  try {
    const response = await axios.post(ADMIN_URL + 'AdminLogin', userData);
    const token = response.data.token;

    // 73g74bd3372bd3g76ydbu2y7

    if (token) {
      await localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAdminLoginStatus = async () => {
  try {
    // console.log('in service getHeadquarterLoginStatus');

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    // Send the token in the Authorization header
    const response = await axios.get(ADMIN_URL + 'getAdminLoginStatus', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error in getAdminLoginStatus:', error.message);
    throw error;
  }
};

const getAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    const response = await axios.get(ADMIN_URL + 'getAdmin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getAdmin:', error.message);
    throw error;
  }
};

const AdminLogout = async () => {
  try {
    await localStorage.removeItem('token');
    return 'Logout Succesful';
  } catch (error) {
    console.log('Error in auth service logout:', error.message);
    throw error;
  }
};

const AdminService = {
  getAdmin,
  getAdminLoginStatus,
  AdminLogin,
  AdminRegister,
  AdminLogout
};

export default AdminService;
