import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

const COUPON_URL = `${BASE_API_URL}/api/coupons/`;

const createCoupon = async (userData) => {
  try {
    const response = await axios.post(COUPON_URL + 'createCoupon', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllCoupons = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    const response = await axios.get(COUPON_URL + 'getAllCoupons', {
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

const validateCoupon = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    const response = await axios.patch(COUPON_URL + 'validateCoupon', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in validateCoupon:', error.message);
    throw error;
  }
};

const updateCoupon = async (id, updatedCoupn) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await axios.patch(COUPON_URL + `updateCoupon/${id}`, updatedCoupn, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in validateCoupon:', error.message);
    throw error;
  }
};

const getDashboardSummary = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    const response = await axios.get(COUPON_URL + 'dashboard-summary', {
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

//   const getAllCoupons1 = async () => {
//     try {
//       const response = await axios.get(API_URL + 'getAllCoupons');
//       return response.data;
//     } catch (error) {
//       console.log('getALLmember error', error.message);
//       throw error;
//     }
//   };

const CouponService = {
  createCoupon,
  getAllCoupons,
  validateCoupon,
  updateCoupon,
  getDashboardSummary
};

export default CouponService;
