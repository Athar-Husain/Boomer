import express from "express";
import {
  getAllCustomers,
  getCustomerCoupons,
  getCustomersWithNoCoupons,
  updateCustomer,
} from "../Controllers/CustomerController.js";
import { assignCouponsToCustomer } from "../Controllers/CouponController.js";
import { AdminProtect } from "../Middlewares/authMIddleware.js";

const router = express.Router();

router.post("/assignCouponsToCustomer", AdminProtect, assignCouponsToCustomer);
router.get("/getCustomerCoupons", AdminProtect, getCustomerCoupons);
router.get(
  "/getCustomersWithNoCoupons",
  AdminProtect,
  getCustomersWithNoCoupons
);
router.get("/getAllCustomers", AdminProtect, getAllCustomers);
router.patch("/updateCustomer", AdminProtect, updateCustomer);

export default router;
