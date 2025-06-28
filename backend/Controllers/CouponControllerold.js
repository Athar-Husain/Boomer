import Coupon from "../Models/Coupon.model.js";
import Customer from "../Models/Customer.model.js";
import moment from "moment";
import cron from "node-cron";
import asyncHandler from "express-async-handler";

// import twilioClient from "../Config/twilio.js";

import axios from "axios";

// Get all coupons for a customer
export const getCustomerCoupons = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer coupons retrieved successfully",
      coupons: customer.coupons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const validateCoupon1 = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Find the customer by phone number
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Find valid coupon based on expiry date
    const validCoupon = customer.coupons.find((coupon) => {
      return moment().isBefore(coupon.expiryDate); // Check if coupon is still valid
    });

    if (!validCoupon) {
      return res
        .status(400)
        .json({ message: "No valid coupon available for this customer" });
    }

    // Return the valid coupon and its discount amount
    res.status(200).json({
      message: "Valid coupon found",
      coupon: validCoupon,
      discount: validCoupon.discount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// controllers/couponController.js (Coupon Logic)
// const moment = require('moment');
// const twilioClient = require('../config/twilio');

export const createCoupon1 = asyncHandler(async (req, res) => {
  const { phoneNumber, discount, expiryDays } = req.body;
  try {
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const expiryDate = moment().add(expiryDays, "days").toDate();
    const coupon = new Coupon({
      discount,
      expiryDate,
      customer: customer._id,
    });
    await coupon.save();
    customer.coupons.push(coupon);
    await customer.save();

    res.status(201).json({ message: "Coupon created", coupon });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const createCoupon2 = asyncHandler(async (req, res) => {
  const { phoneNumber, discount, expiryDays } = req.body;
  try {
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const expiryDate = moment().add(expiryDays, "days").toDate();
    const coupon = new Coupon({
      discount,
      expiryDate,
      customer: customer._id,
    });
    await coupon.save();
    customer.coupons.push(coupon);
    await customer.save();

    res.status(201).json({ message: "Coupon created", coupon });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//// real code

export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const { couponCode, discount, expiresIn, minPurchase } = req.body;

    // Validate input
    if (!couponCode || !discount || !expiresIn || !minPurchase) {
      return res.status(400).json({ message: "All fields are required" });
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

// validating coupons

export const validateCoupon2 = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const validCoupon = customer.coupons.find(
      (coupon) => moment().isBefore(coupon.expiryDate) && !coupon.isRedeemed
    );

    if (!validCoupon) {
      return res.status(400).json({ message: "No valid coupon available" });
    }

    // Mark coupon as used
    validCoupon.isRedeemed = true;
    await validCoupon.save();

    res.status(200).json({
      message: "Coupon applied successfully",
      discount: validCoupon.discount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const validateCoupon00 = asyncHandler(async (req, res) => {
  const { phoneNumber, couponId } = req.body;

  try {
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check for expired coupons and mark them as not considered
    const expiredCoupons = customer.coupons.filter(
      (coupon) =>
        new Date(coupon.expiryDate) < new Date() && coupon.isConsidered
    );
    if (expiredCoupons.length > 0) {
      // Mark expired coupons as not considered but only for this customer's coupons
      await Coupon.updateMany(
        {
          _id: { $in: expiredCoupons.map((coupon) => coupon._id) },
          customer: customer._id,
        },
        { $set: { isConsidered: false } }
      );
    }

    // Find the first unredeemed and valid coupon
    const validCoupon = customer.coupons.find(
      (coupon) =>
        coupon.isConsidered &&
        !coupon.isRedeemed &&
        new Date(coupon.expiryDate) >= new Date()
    );

    if (!validCoupon) {
      return res.status(400).json({ message: "No valid coupon available" });
    }

    // Mark the coupon as redeemed
    validCoupon.isRedeemed = true;
    validCoupon.isConsidered = false; // Mark as no longer considered for future redemptions
    await validCoupon.save();

    // Mark all other coupons for the customer as not considered
    await Coupon.updateMany(
      { customer: customer._id, isRedeemed: false },
      { $set: { isConsidered: false } }
    );

    res.status(200).json({
      message: "Coupon applied successfully",
      discount: validCoupon.discount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const { phoneNumber, couponId } = req.body; // Expecting couponId from frontend
  // console.log("req query in validateCoupon", req.query);
  // console.log("req", req)

  // console.log("cnsole in valideCoupon backend ", phoneNumber, couponId);
  try {
    const customer = await Customer.findOne({ phoneNumber }).populate(
      "coupons"
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Find the coupon by ID for this customer and validate its state
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

    // Mark the coupon as redeemed and not considered for future use
    validCoupon.isRedeemed = true;
    validCoupon.isConsidered = false; // Mark as no longer considered for future redemptions
    await validCoupon.save();

    // Optionally, you can mark all other unredeemed coupons as not considered for the customer
    await Coupon.updateMany(
      { customer: customer._id, isRedeemed: false },
      { $set: { isConsidered: false } }
    );

    res.status(200).json({
      message: "Coupon applied successfully",
      discount: validCoupon.discount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// export const sendCouponToWhatsApp = asyncHandler(
//   async (customerPhone, couponDetailsArray) => {
//     try {
//       let message = "🎉 You have new coupons! 🎉\n\n";

//       couponDetailsArray.forEach((coupon) => {
//         message += `
//       Discount: ${coupon.discountAmount}% off
//       Expiry Date: ${moment(coupon.expiryDate).format("YYYY-MM-DD")}

//       Use this coupon at our cafe before it expires!
//       -------------------------
//       `;
//       });

//       const response = await twilioClient.messages.create({
//         from: process.env.TWILIO_WHATSAPP_NUMBER,
//         to: `whatsapp:${customerPhone}`,
//         body: message,
//       });

//       console.log(`WhatsApp message sent: ${response.sid}`);
//     } catch (error) {
//       console.error("Error sending WhatsApp message:", error);
//     }
//   }
// );

// export const cleanExpiredCoupons = asyncHandler(async () => {
//   try {
//     // Get the current date minus 90 days
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - 90);

//     // Delete coupons that were created more than 90 days ago
//     const result = await Coupon.deleteMany({ createdAt: { $lt: cutoffDate } });

//     console.log(`Deleted ${result.deletedCount} expired coupons.`);
//   } catch (error) {
//     console.error('Error cleaning expired coupons:', error);
//   }
// });

// export const sendExpiryReminder = asyncHandler(async () => {
//   try {
//     const upcomingExpiryDate = moment().add(2, "days").toDate();

//     // Find coupons expiring in 2 days and not used
//     const expiringCoupons = await Coupon.find({
//       expiryDate: { $lte: upcomingExpiryDate },
//       isRedeemed: false,
//     }).populate("customer");

//     for (let coupon of expiringCoupons) {
//       if (coupon.customer) {
//         let message = `⚠️ Reminder! Your ${
//           coupon.discount
//         }% discount coupon is expiring on ${moment(coupon.expiryDate).format(
//           "YYYY-MM-DD"
//         )}. Use it before it's gone!`;

//         // Send WhatsApp message
//         await twilioClient.messages.create({
//           from: process.env.TWILIO_WHATSAPP_NUMBER,
//           to: `whatsapp:${coupon.customer.phoneNumber}`,
//           body: message,
//         });

//         console.log(`Expiry reminder sent to ${coupon.customer.phoneNumber}`);
//       }
//     }
//   } catch (error) {
//     console.error("Error sending expiry reminders:", error);
//   }
// });

export const sendCouponsOnMobile = asyncHandler(
  async (customerPhone, couponDetailsArray) => {
    try {
      let message1 = "🎉 You have new coupons! 🎉\n\n";
      // let message1 = "You have new coupons!\n\n";

      // Build the message content using the couponDetailsArray
      couponDetailsArray.forEach((coupon) => {
        message1 += `
      Discount: ${coupon.discount}% off
      Expiry Date: ${moment(coupon.expiryDate).format("YYYY-MM-DD")}
      
      Use this coupon in Revive cafe before it expires!
      -------------------------`;
      });

      console.log("message11111 in Coupon Controller ", message1);

      let message = `Dear Member ${message1}, We have received your application. After verification, we will update you. IMA AMS`;

      // console.log("message in Coupon Controller ", message);

      // Construct the Nimbus API URL with required parameters
      // const nimbusApiUrl = `${process.env.NIMBUS_API_URL}?UserID=${
      //   process.env.NIMBUS_USERID
      // }&Password=${process.env.NIMBUS_PASS}&SenderID=${
      //   process.env.NIMBUS_SENDERID
      // }&Phno=${customerPhone}&Msg=${encodeURIComponent(message)}&EntityID=${
      //   process.env.NIMBUS_ENTITYID
      // }&TemplateID=${process.env.NIMBUS_APPLIRECEIVE_TEMPLATEID}`;

      const nimbusApiUrl = `${process.env.WA_API_URL}apikey=${
        process.env.WA_API_KEY
      }&mobile=${customerPhone}&msg=${encodeURIComponent(message1)}`;

      // Send the request to the Nimbus API
      const response = await axios.get(nimbusApiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Nimbus API response:", response.data);

      if (response.data) {
        console.log("Message sent successfully!");
      } else {
        console.log("Failed to send message, response data:", response.data);
      }
    } catch (error) {
      console.error("Error sending mobile message:", error);
    }
  }
);

// Run every day at 10 AM
// cron.schedule("0 10 * * *", sendExpiryReminder);

export const assignCouponsToCustomer00 = asyncHandler(async (req, res) => {
  const { phoneNumber, name } = req.body;

  try {
    let customer = await Customer.findOne({ phoneNumber });

    if (!customer) {
      customer = new Customer({
        phoneNumber,
        name,
        coupons: [],
      });
      await customer.save();
    }

    // Fetch available coupons (those that are unassigned)
    const availableCoupons = await Coupon.find({ customer: null });

    if (availableCoupons.length === 0) {
      return res
        .status(400)
        .json({ message: "No available coupons. Please add coupons first." });
    }

    // Mark all available coupons as considered for the customer
    const assignedCoupons = availableCoupons.slice(0, 3);
    for (let coupon of assignedCoupons) {
      coupon.isConsidered = true;
      coupon.customer = customer._id;
      await coupon.save();

      // Add coupon to the customer's coupon array
      customer.coupons.push(coupon._id);
    }

    await customer.save();
    res.status(200).json({
      message: "Coupons assigned to customer successfully.",
      coupons: assignedCoupons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
