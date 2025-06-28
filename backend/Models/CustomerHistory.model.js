import mongoose from "mongoose";

const couponStatusHistorySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },
    status: {
      type: String,
      enum: ["assigned", "redeemed", "expired", "reminder_sent"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CouponStatusHistory = mongoose.model(
  "CouponStatusHistory",
  couponStatusHistorySchema
);
export default CouponStatusHistory;
