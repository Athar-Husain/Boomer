import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true, // Ensure phone number is unique
  },
  name: {
    type: String,
    // required: true,
  },
  coupons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon', // Link to Coupon Model
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const Customer = mongoose.model("customer", customerSchema)

export default Customer;
