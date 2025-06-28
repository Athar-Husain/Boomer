import { configureStore } from '@reduxjs/toolkit';
// import customizationReducer from './features/customization/customizationSlice'; // Import the slice
// import headquarterReducer from './features/headQuarter/headquarterSlice';
// import memberReducer from './features/auth/memberSlice';
// import localReducer from './features/local/localSlice';
// import stateReducer from './features/state/stateSlice';
import customizationReducer from './features/customization/customizationSlice'; // Import the slice
import AdminReducer from './features/Admin/adminSlice';
import CouponReducer from './features/Coupons/couponSlice';
import CustomerReducer from './features/Customers/customerSlice';

export const store = configureStore({
  reducer: {
    // headquarter: headquarterReducer,
    // states: stateReducer,
    // member: memberReducer,
    // local: localReducer,
    Admin: AdminReducer,
    Coupon: CouponReducer,
    Customer: CustomerReducer,
    customization: customizationReducer // Add the slice to the reducer object
  }
});
