import express from "express";
import {
  createCoupon,
  getAllCoupons,
  validateCoupon,
  updateCoupon,
  getDashboardSummary,
} from "../Controllers/CouponController.js";
import { AdminProtect } from "../Middlewares/authMIddleware.js";

const router = express.Router();

router.post("/createCoupon", AdminProtect, createCoupon);
router.get("/getAllCoupons", AdminProtect, getAllCoupons);
// router.get("/getCustomersWithNoCoupons", getCustomersWithNoCoupons);
router.patch("/validateCoupon", validateCoupon);
router.patch("/updateCoupon/:id", updateCoupon);

router.get("/dashboard-summary", AdminProtect, getDashboardSummary);

export default router;
