import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    minPurchase: {
      type: Number,
      required: true,
    },
    // discount in Percentage
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Discount range between 0% and 100%
    },
    expiresIn: {
      type: Number,
      required: true, // Expiry Duration of the coupon
    },
    expiryDate: {
      type: Date,
      // required: true, // Expiry date of the coupon
    },
    isRedeemed: {
      type: Boolean,
      default: false, // New field to track usage
    },
    isConsidered: {
      type: Boolean,
      default: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Link to the Customer who gets this coupon
      // required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

couponSchema.pre("save", function (next) {
  if (this.expiresIn && !this.expiryDate) {
    const today = new Date();
    this.expiryDate = new Date(today.setDate(today.getDate() + this.expiresIn)); // Calculate the expiryDate
  }

  // Automatically mark expired coupons as not considered
  if (this.expiryDate < new Date()) {
    this.isConsidered = false; // Mark as not considered if expired
  }

  next();
});

couponSchema.index({ expiryDate: 1 }); // Index for fast searching by expiry date

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
