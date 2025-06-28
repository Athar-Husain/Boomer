import Coupon from "../Models/Coupon.model.js";
import Customer from "../Models/Customer.model.js";
import moment from "moment";
import cron from "node-cron";
import asyncHandler from "express-async-handler";
// import twilioClient from "../Config/twilio.js";
import axios from "axios";

// createCoupon,
//   getAllCoupons,
//   validateCoupon,

import {
  sendCouponsOnWhatsApp,
  sendExpiryReminder,
} from "./ServicesController.js";

import CouponStatusHistory from "../Models/CustomerHistory.model.js";

export const createCoupon = asyncHandler(async (req, res) => {
  const { couponCode, discount, expiresIn, minPurchase } = req.body;

  try {
    // Validate input
    if (!couponCode || !discount || !expiresIn || !minPurchase) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate coupon code
    const existingCoupon = await Coupon.findOne({ couponCode });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      couponCode,
      discount,
      expiresIn,
      minPurchase,
    });

    await coupon.save();

    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { couponCode, discount, expiresIn, minPurchase } = req.body;

  // Check if coupon exists
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }

  // Optionally prevent duplicate coupon codes
  if (couponCode && couponCode !== coupon.couponCode) {
    const existingCoupon = await Coupon.findOne({ couponCode });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }
  }

  // Update fields if they are provided
  if (couponCode) coupon.couponCode = couponCode;
  if (discount !== undefined) coupon.discount = discount;
  if (expiresIn) coupon.expiresIn = expiresIn;
  if (minPurchase !== undefined) coupon.minPurchase = minPurchase;

  const updatedCoupon = await coupon.save();

  res.status(200).json({
    message: "Coupon updated successfully",
    coupon: updatedCoupon,
  });
});

export const assignCouponsToCustomer = asyncHandler(async (req, res) => {
  const { phoneNumber, name } = req.body;

  try {
    // Check if customer exists
    let customer = await Customer.findOne({ phoneNumber });

    // If customer doesn't exist, create a new customer
    if (!customer) {
      customer = new Customer({ phoneNumber, name, coupons: [] });
      await customer.save();
    }

    // Check if customer already has an active coupon
    const activeCoupon = await Coupon.findOne({
      customer: customer._id,
      isRedeemed: false,
      expiryDate: { $gte: new Date() },
      isConsidered: true,
    });

    if (activeCoupon) {
      return res
        .status(400)
        .json({ error: "Customer already has an active coupon." });
    }

    // Fetch available coupons
    const availableCoupons = await Coupon.find({ customer: null }).limit(3);

    if (availableCoupons.length === 0) {
      return res.status(400).json({ error: "No available coupons." });
    }

    const newlyAssignedCoupons = [];

    for (const coupon of availableCoupons) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + coupon.expiresIn);

      const newCoupon = new Coupon({
        ...coupon.toObject(),
        _id: undefined,
        customer: customer._id,
        expiryDate,
        isRedeemed: false,
        isConsidered: true,
      });

      // better approach

      // const newCoupon = new Coupon({
      //   couponCode: coupon.code,
      //   minPurchase: coupon.minPurchase,
      //   description: coupon.description,
      //   discount: coupon.discount,
      //   expiresIn: coupon.expiresIn,
      //   customer: customer._id,
      //   expiryDate,
      //   isConsidered: true,
      //   isRedeemed: false,
      // });

      await newCoupon.save();
      customer.coupons.push(newCoupon._id);

      // Log the coupon assignment
      await CouponStatusHistory.create({
        customer: customer._id,
        coupon: newCoupon._id,
        status: "assigned",
        date: new Date(),
      });

      newlyAssignedCoupons.push(newCoupon);
    }

    await customer.save();

    // Send coupons to WhatsApp
    await sendCouponsOnWhatsApp(customer.phoneNumber, newlyAssignedCoupons);

    res.status(200).json({
      message: "Coupons assigned and sent to customer",
      coupons: newlyAssignedCoupons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const { phoneNumber, couponId } = req.body;

  try {
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const validCoupon = customer.coupons.find(
      (coupon) =>
        coupon._id.toString() === couponId &&
        coupon.isConsidered &&
        !coupon.isRedeemed &&
        new Date(coupon.expiryDate) >= new Date()
    );

    if (!validCoupon) {
      return res
        .status(400)
        .json({ message: "Coupon is not valid or already redeemed" });
    }

    validCoupon.isRedeemed = true;
    validCoupon.isConsidered = false;
    await validCoupon.save();

    await Coupon.updateMany(
      { customer: customer._id, isRedeemed: false },
      { $set: { isConsidered: false } }
    );

    // Log the coupon redemption
    await CouponStatusHistory.create({
      customer: customer._id,
      coupon: validCoupon._id,
      status: "redeemed",
      date: new Date(),
    });

    res.status(200).json({
      message: "Coupon applied successfully",
      discount: validCoupon.discount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find({ customer: null }).sort({
      createdAt: -1,
    }); // Only unused coupons
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Mark Expired Coupons as isConsidered: false

cron.schedule("0 0 * * *", async () => {
  try {
    await Coupon.updateMany(
      { expiryDate: { $lt: new Date() }, isConsidered: true },
      { $set: { isConsidered: false } }
    );
    console.log("Expired coupons marked as not considered.");
  } catch (error) {
    console.error("Error marking expired coupons:", error);
  }
});

// Cron Job: Send Expiry Reminders

cron.schedule("0 0 * * *", async () => {
  try {
    const coupons = await Coupon.find({
      isRedeemed: false,
      isConsidered: true,
      expiryDate: {
        $gte: new Date(),
        $lt: new Date(new Date().setDate(new Date().getDate() + 3)),
      },
    }).populate("customer");

    for (const coupon of coupons) {
      if (coupon.customer.coupons.length === 1) {
        await sendExpiryReminder(coupon.customer.phoneNumber, coupon);
        console.log(`Expiry reminder sent to ${coupon.customer.phoneNumber}`);
      }
    }
  } catch (error) {
    console.error("Error sending expiry reminders:", error);
  }
});

// GET /api/admin/dashboard-summary
export const getDashboardSummary = asyncHandler(async (req, res) => {
  try {
    const [
      totalCoupons,
      totalCustomers,
      assignedCoupons,
      redeemedCoupons,
      expiredCoupons,
      whatsappSent,
      expiryRemindersSent,
    ] = await Promise.all([
      Coupon.countDocuments({}), // 🏷️ Total Coupons Created
      Customer.countDocuments({}), // 👥 Total Customers
      Coupon.countDocuments({ customer: { $ne: null } }), // 🎯 Coupons Assigned
      Coupon.countDocuments({ isRedeemed: true }), // 🟢 Coupons Redeemed
      Coupon.countDocuments({
        expiryDate: { $lt: new Date() },
        isRedeemed: false,
      }), // ⛔ Expired Coupons
      CouponStatusHistory.countDocuments({ status: "whatsapp_sent" }), // 📤 WhatsApp Sent
      CouponStatusHistory.countDocuments({ status: "expiry_reminder" }), // ⏰ Expiry Reminders Sent
    ]);

    const redemptionRate =
      assignedCoupons > 0
        ? Math.round((redeemedCoupons / assignedCoupons) * 100)
        : 0;

    res.status(200).json({
      totalCoupons,
      totalCustomers,
      assignedCoupons,
      redeemedCoupons,
      expiredCoupons,
      redemptionRate,
      whatsappSent,
      expiryRemindersSent,
    });
  } catch (error) {
    console.error("Error in dashboard summary:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
