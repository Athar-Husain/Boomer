import axios from "axios";
import moment from "moment";
import asyncHandler from "express-async-handler";
import CouponStatusHistory from "../Models/CustomerHistory.model.js"; // Make sure this import exists

// export const sendCouponsOnWhatsApp = asyncHandler(
//   async (customerPhone, couponDetailsArray) => {
//     try {
//       if (
//         !customerPhone ||
//         !Array.isArray(couponDetailsArray) ||
//         couponDetailsArray.length === 0
//       ) {
//         throw new Error("Invalid phone number or coupon details.");
//       }

//       let messageBody = "🎉 You have new coupons! 🎉\n\n";

//       // Build the message content using the couponDetailsArray
//       couponDetailsArray.forEach((coupon, index) => {
//         messageBody += `Coupon ${index + 1}:\n`;
//         messageBody += `Discount: ${coupon.discount}% off\n`;
//         messageBody += `Minimum Order value: ${coupon.minPurchase}% off\n`;
//         messageBody += `Expiry Date: ${moment(coupon.expiryDate).format(
//           "YYYY-MM-DD"
//         )}\n`;
//         messageBody += `Use this coupon At Revive Cafe before it expires!\n`;
//         messageBody += `-------------------------\n`;
//       });

//       // Optional wrapper or personalization
//       const finalMessage = `Dear Customer,\n${messageBody}`;

//       // console.log("final Message in Services Controller", finalMessage);

//       // Construct API URL
//       const apiUrl = `${process.env.WA_API_URL}apikey=${
//         process.env.WA_API_KEY
//       }&mobile=${customerPhone}&msg=${encodeURIComponent(finalMessage)}`;

//       // Send request
//       const response = await axios.get(apiUrl);

//       // console.log("API Response:", response.data);

//       if (response.status === 200) {
//         // console.log("Message sent successfully!");
//       } else {
//         console.error("Failed to send message:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error sending mobile message:", error.message || error);

//       res.status(500).json({ message: error.message });
//     }
//   }
// );

export const sendCouponsOnWhatsApp = async (
  customerPhone,
  couponDetailsArray
) => {
  try {
    if (
      !customerPhone ||
      !Array.isArray(couponDetailsArray) ||
      couponDetailsArray.length === 0
    ) {
      throw new Error("Invalid phone number or coupon details.");
    }

    let messageBody = "🎉 You have new coupons! 🎉\n\n";

    // Build the message content using the couponDetailsArray
    couponDetailsArray.forEach((coupon, index) => {
      messageBody += `Coupon ${index + 1}:\n`;
      messageBody += `Discount: ${coupon.discount}% off\n`;
      messageBody += `Minimum Order value: ${coupon.minPurchase}% off\n`;
      messageBody += `Expiry Date: ${moment(coupon.expiryDate).format(
        "YYYY-MM-DD"
      )}\n`;
      messageBody += `Use this coupon at Revive Cafe before it expires!\n`;
      messageBody += `-------------------------\n`;
    });

    // Optional wrapper or personalization
    const finalMessage = `Dear Customer,\n${messageBody}`;

    // Construct API URL
    const apiUrl = `${process.env.WA_API_URL}apikey=${
      process.env.WA_API_KEY
    }&mobile=${customerPhone}&msg=${encodeURIComponent(finalMessage)}`;

    // Send request
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      return { success: true };
    } else {
      // console.error("Failed to send message:", response.statusText);
      return { success: false, error: "Failed to send message" };
    }
  } catch (error) {
    // console.error("Error sending mobile message:", error.message || error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

export const sendExpiryReminder = asyncHandler(async (phoneNumber, coupon) => {
  try {
    const formattedDate = moment(coupon.expiryDate).format("YYYY-MM-DD");

    const message = `⚠️ Reminder: Your coupon for ${coupon.discount}% off at Revive Cafe will expire on ${formattedDate}. Use it before it’s gone!`;

    const apiUrl = `${process.env.WA_API_URL}apikey=${
      process.env.WA_API_KEY
    }&mobile=${phoneNumber}&msg=${encodeURIComponent(message)}`;

    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 && response.data) {
      // console.log(`✅ Expiry reminder sent to ${phoneNumber}`);
    } else {
      console.warn(
        `⚠️ Failed to send reminder to ${phoneNumber}`,
        response.data
      );
    }
  } catch (error) {
    console.error(
      `❌ Error sending expiry reminder to ${phoneNumber}:`,
      error.message
    );
  }
});
