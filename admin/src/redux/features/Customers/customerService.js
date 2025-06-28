import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

const CUSTOMER_URL = `${BASE_API_URL}/api/customers/`;

const token = localStorage.getItem('token');

// const assignCouponsToCustomer = async (userData) => {

//   try {

//     if (!token) {
//       throw new Error('No token found. Please login first.');
//     }
//     const response = await axios.post(COUPON_URL + 'assignCouponsToCustomer',userData {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

const assignCouponsToCustomer = async (userData) => {
  try {
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await axios.post(CUSTOMER_URL + 'assignCouponsToCustomer', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCustomerCoupons1 = async (userData) => {
  try {
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    console.log('user data in Customer Service getCustomerCoupons', userData);
    const response = await axios.get(CUSTOMER_URL + 'getCustomerCoupons', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getAllCoupons:', error.message);
    throw error;
  }
};

const getCustomerCoupons = async (userData) => {
  try {
    const token = localStorage.getItem('token'); // Fetch token properly
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    console.log('user data in Customer Service getCustomerCoupons', userData);

    const response = await axios.get(CUSTOMER_URL + 'getCustomerCoupons', {
      headers: { Authorization: `Bearer ${token}` },
      params: userData
    });

    return response.data;
  } catch (error) {
    console.error('Error in getCustomerCoupons:', error.message);
    throw error;
  }
};

const getAllCustomers = async () => {
  try {
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    const response = await axios.get(CUSTOMER_URL + 'getAllCustomers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch {
    console.error('Error in getAllCoupons:', error.message);
    throw error.message;
  }
};

const updateCustomer = async (userData) => {
  try {
    const token = localStorage.getItem('token'); // Optional: move inside to ensure fresh token
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await axios.patch(CUSTOMER_URL + 'updateCustomer', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error in updateCustomer:', error);
    console.error('Error in updateCustomer:', error.message);
    throw error; // or throw error.message;
  }
};

const getCustomersWithNoCoupons = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    const response = await axios.get(CUSTOMER_URL + 'getCustomersWithNoCoupons', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in getAllCoupons:', error.message);
    throw error;
  }
};

const CustomerServie = {
  assignCouponsToCustomer,
  getCustomerCoupons,
  getAllCustomers,
  updateCustomer,
  getCustomersWithNoCoupons
};

export default CustomerServie;
